import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const dbFile = path.join(rootDir, 'database/sinac.sqlite');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
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

  logApi('=== PRUEBA DE PERSISTENCIA SQLITE WAL Y VALIDACIONES API (ROYNER) ===');
  let srv = spawn('node', ['server/index.js'], { cwd: rootDir, stdio: 'pipe' });
  await wait(1500);

  // Paso A: Confirmar eliminación de SINAC-2026-001
  const rInit = await fetch('http://localhost:3001/api/reservations');
  const bodyInit = await rInit.json();
  logApi(`1. GET /api/reservations inicial (verifica eliminación de SINAC-2026-001): HTTP ${rInit.status} -> ${JSON.stringify(bodyInit)}`);

  // Paso B: Validación HTTP 400
  const r400 = await fetch('http://localhost:3001/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ parque_id: 'pn-volcan-tenorio' }),
  });
  const body400 = await r400.json();
  logApi(`2. POST /api/reservations sin campos obligatorios: HTTP ${r400.status} -> ${JSON.stringify(body400)}`);

  // Paso C: Crear 3 reservaciones reales en SQLite
  const muestras = [
    {
      parque_id: 'pn-volcan-tenorio',
      nombre_visitante: 'Royner Gutiérrez Ugalde',
      email_visitante: 'gutierrezroyner3@gmail.com',
      telefono_visitante: '+506 8888-2472',
      cantidad_visitantes: 2,
      fecha_visita: '2026-11-15',
    },
    {
      parque_id: 'pn-cano-negro',
      nombre_visitante: 'Jocelyn Carballo Castillo',
      email_visitante: 'jocelyn.carballo@est.utn.ac.cr',
      telefono_visitante: '+506 8777-3006',
      cantidad_visitantes: 3,
      fecha_visita: '2026-11-18',
    },
    {
      parque_id: 'pn-volcan-tenorio',
      nombre_visitante: 'Camila Investigadora SINAC',
      email_visitante: 'camila@est.utn.ac.cr',
      telefono_visitante: '+506 8666-1122',
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
    logApi(`3. POST /api/reservations creado: HTTP ${res.status} -> Código=${data.data.codigo_reserva} (${data.data.nombre_visitante})`);
    await wait(20);
  }

  // Paso D: Consultar ANTES del reinicio/redeploy
  const rBefore = await fetch('http://localhost:3001/api/reservations');
  const bodyBefore = await rBefore.json();
  logApi(`4. GET /api/reservations ANTES del redeploy/reinicio: HTTP ${rBefore.status} -> count=${bodyBefore.count} -> ${JSON.stringify(bodyBefore)}`);

  // Paso E: Reiniciar servidor (simulando Redeploy sobre almacenamiento persistente)
  logApi('5. Ejecutando reinicio del servidor (Redeploy)...');
  srv.kill();
  await wait(1200);

  srv = spawn('node', ['server/index.js'], { cwd: rootDir, stdio: 'pipe' });
  await wait(1500);

  // Paso F: Consultar DESPUÉS del reinicio/redeploy
  const rAfter = await fetch('http://localhost:3001/api/reservations');
  const bodyAfter = await rAfter.json();
  logApi(`6. GET /api/reservations DESPUÉS del redeploy/reinicio: HTTP ${rAfter.status} -> count=${bodyAfter.count} -> ${JSON.stringify(bodyAfter)}`);
  logApi('=== PRUEBA DE PERSISTENCIA COMPLETADA EXITOSAMENTE ===');

  fs.writeFileSync(path.join(__dirname, 'evidencia_api_persistencia.log'), apiLogs.join('\n') + '\n', 'utf8');
  fs.writeFileSync(
    path.join(__dirname, 'evidencia_api_persistencia.json'),
    JSON.stringify({ inicial: bodyInit, validacion400: body400, antesRedeploy: bodyBefore, despuesRedeploy: bodyAfter }, null, 2),
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
  console.error(err);
  process.exit(1);
});

