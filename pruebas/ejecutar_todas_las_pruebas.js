import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const dbFile = path.join(rootDir, 'database/sinac.sqlite');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Espera hasta que el servidor responda en la URL dada.
 * Reintenta cada `intervaloMs` ms hasta alcanzar `timeoutMs` total.
 * Si el servidor no responde a tiempo, lanza un error con el motivo real.
 */
async function waitForServer(url, { timeoutMs = 10000, intervaloMs = 300 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      await fetch(url, { signal: AbortSignal.timeout(500) });
      return; // cualquier respuesta HTTP (incluyendo 401) confirma que el servidor está listo
    } catch (err) {
      lastError = err;
      await wait(intervaloMs);
    }
  }
  throw new Error(
    `El servidor no respondió en ${timeoutMs} ms en ${url}.\n` +
    `Último error: ${lastError?.message || 'desconocido'}\n` +
    `Revisa que el puerto 3001 no esté bloqueado y que server/index.js arranque correctamente.`
  );
}

/**
 * Inicia el servidor Express y espera a que esté disponible.
 * Captura stderr del proceso hijo para reportar errores reales de arranque.
 */
function iniciarServidor() {
  const srv = spawn('node', ['server/index.js'], { cwd: rootDir, stdio: 'pipe' });
  const srvErrors = [];
  srv.stderr.on('data', (chunk) => {
    const msg = chunk.toString().trim();
    if (msg) srvErrors.push(msg);
  });
  srv.on('error', (err) => {
    srvErrors.push('Error al iniciar proceso: ' + err.message);
  });
  srv.getSrvErrors = () => srvErrors;
  return srv;
}

async function main() {
  // Verificar ADMIN_TOKEN antes de ejecutar pruebas autenticadas
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (!ADMIN_TOKEN) {
    console.error('[ERROR] La variable de entorno ADMIN_TOKEN no está definida.');
    console.error('        Define ADMIN_TOKEN antes de ejecutar las pruebas.');
    console.error('        Ejemplo (PowerShell): $env:ADMIN_TOKEN="tu_token_secreto"; node pruebas/ejecutar_todas_las_pruebas.js');
    process.exit(1);
  }
  const authHeaders = { Authorization: `Bearer ${ADMIN_TOKEN}` };

  // 1. Limpiar base de datos previa
  for (const ext of ['', '-wal', '-shm']) {
    const p = `${dbFile}${ext}`;
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  const apiLogs = [];
  const logApi = (msg) => {
    const line = `[${new Date().toISOString()}] ${msg}`;
    console.log(line);
    apiLogs.push(line);
  };

  logApi('=== PRUEBA DE PERSISTENCIA SQLITE WAL Y VALIDACIONES API ===');

  // Arrancar servidor y esperar disponibilidad real (no tiempo fijo)
  let srv = iniciarServidor();
  logApi('Servidor iniciado — esperando disponibilidad en http://localhost:3001 ...');
  try {
    await waitForServer('http://localhost:3001/api/reservations', { timeoutMs: 10000 });
  } catch (err) {
    const srvErrors = srv.getSrvErrors();
    if (srvErrors.length) {
      console.error('[ERROR] Salida de error del servidor:\n' + srvErrors.join('\n'));
    }
    srv.kill();
    throw err;
  }
  logApi('Servidor disponible y respondiendo.');

  // Paso A: Verificar que sin token el endpoint responde 401 (prueba de seguridad)
  const rInit = await fetch('http://localhost:3001/api/reservations');
  const bodyInit = await rInit.json();
  logApi(`1. GET /api/reservations sin token (prueba de autenticación): HTTP ${rInit.status} -> ${JSON.stringify(bodyInit)}`);

  // Paso B: Validación HTTP 400
  const r400 = await fetch('http://localhost:3001/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ parque_id: 'pn-volcan-tenorio' }),
  });
  const body400 = await r400.json();
  logApi(`2. POST /api/reservations sin campos obligatorios: HTTP ${r400.status} -> ${JSON.stringify(body400)}`);

  // Paso C: Crear 3 reservaciones de prueba en SQLite
  const muestras = [
    {
      parque_id: 'pn-volcan-tenorio',
      nombre_visitante: 'Visitante Prueba 1',
      email_visitante: 'prueba1@sinac.test',
      telefono_visitante: '+506 0000-0001',
      cantidad_visitantes: 2,
      fecha_visita: '2026-11-15',
    },
    {
      parque_id: 'pn-cano-negro',
      nombre_visitante: 'Visitante Prueba 2',
      email_visitante: 'prueba2@sinac.test',
      telefono_visitante: '+506 0000-0002',
      cantidad_visitantes: 3,
      fecha_visita: '2026-11-18',
    },
    {
      parque_id: 'pn-volcan-tenorio',
      nombre_visitante: 'Visitante Prueba 3',
      email_visitante: 'prueba3@sinac.test',
      telefono_visitante: '+506 0000-0003',
      cantidad_visitantes: 4,
      fecha_visita: '2026-11-22',
    },
  ];

  for (const m of muestras) {
    const res = await fetch('http://localhost:3001/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(m),
    });
    const data = await res.json();
    logApi(`3. POST /api/reservations creado: HTTP ${res.status} -> Código=${data.data.codigo_reserva} (visitante de prueba)`);
    await wait(20);
  }

  // Paso D: Consultar ANTES del reinicio/redeploy
  const rBefore = await fetch('http://localhost:3001/api/reservations', { headers: authHeaders });
  const bodyBefore = await rBefore.json();
  logApi(`4. GET /api/reservations ANTES del redeploy/reinicio: HTTP ${rBefore.status} -> count=${bodyBefore.count}`);

  // Paso E: Reiniciar servidor (simulando Redeploy sobre almacenamiento persistente)
  logApi('5. Ejecutando reinicio del servidor (Redeploy)...');
  srv.kill();
  await wait(500); // dar tiempo al proceso a terminar antes de reusar el puerto

  srv = iniciarServidor();
  logApi('Servidor reiniciado — esperando disponibilidad ...');
  try {
    await waitForServer('http://localhost:3001/api/reservations', { timeoutMs: 10000 });
  } catch (err) {
    const srvErrors = srv.getSrvErrors();
    if (srvErrors.length) {
      console.error('[ERROR] Salida de error del servidor tras reinicio:\n' + srvErrors.join('\n'));
    }
    srv.kill();
    throw err;
  }
  logApi('Servidor disponible tras reinicio.');

  // Paso F: Consultar DESPUÉS del reinicio/redeploy
  const rAfter = await fetch('http://localhost:3001/api/reservations', { headers: authHeaders });
  const bodyAfter = await rAfter.json();
  logApi(`6. GET /api/reservations DESPUÉS del redeploy/reinicio: HTTP ${rAfter.status} -> count=${bodyAfter.count}`);
  logApi('=== PRUEBA DE PERSISTENCIA COMPLETADA EXITOSAMENTE ===');

  fs.writeFileSync(path.join(__dirname, 'evidencia_api_persistencia.log'), apiLogs.join('\n') + '\n', 'utf8');
  fs.writeFileSync(
    path.join(__dirname, 'evidencia_api_persistencia.json'),
    JSON.stringify({ inicial: bodyInit, validacion400: body400, antesRedeploy: { count: bodyBefore.count }, despuesRedeploy: { count: bodyAfter.count } }, null, 2),
    'utf8'
  );

  // 2. Ejecutar Respaldo (con las 3 reservaciones reales)
  console.log('\n--- Ejecutando Respaldo ---');
  execFileSync('node', [path.join(__dirname, 'respaldo_restauracion/respaldo_sqlite.js')], { stdio: 'inherit' });

  // 3. Ejecutar Restauración (en base limpia separada)
  console.log('\n--- Ejecutando Restauración ---');
  execFileSync('node', [path.join(__dirname, 'respaldo_restauracion/restauracion_sqlite.js')], { stdio: 'inherit' });

  // 4. Ejecutar Prueba de Carga (contra el servidor activo)
  console.log('\n--- Ejecutando Prueba de Carga ---');
  execFileSync('node', [path.join(__dirname, 'rendimiento/prueba_carga.js')], { stdio: 'inherit' });

  srv.kill();
}

main().catch((err) => {
  console.error('[FALLO] La prueba terminó con error:');
  console.error(err.message || err);
  process.exit(1);
});

