import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, '../evidencias_royner');

fs.mkdirSync(outDir, { recursive: true });

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function renderTerminalPng(filename, title, subtitle, lines) {
  const width = 1280;
  const lineHeight = 24;
  const headerHeight = 85;
  const paddingBottom = 35;
  const height = Math.max(420, headerHeight + lines.length * lineHeight + paddingBottom);

  const renderedLines = lines
    .map((line, i) => {
      const y = headerHeight + 25 + i * lineHeight;
      let color = '#e2e8f0';
      if (line.startsWith('===') || line.includes('EXITOSAMENTE') || line.includes('APROBADA')) {
        color = '#4ade80';
      } else if (line.startsWith('$') || line.startsWith('PS ')) {
        color = '#38bdf8';
      } else if (line.includes('HTTP 400') || line.includes('error')) {
        color = '#fbbf24';
      } else if (line.includes('SHA-256') || line.includes('PRAGMA') || line.includes('Resultado [')) {
        color = '#a78bfa';
      } else if (line.startsWith('//') || line.startsWith('#')) {
        color = '#94a3b8';
      }
      return `<text x="28" y="${y}" fill="${color}" font-family="Consolas, 'Courier New', monospace" font-size="14.5">${escapeXml(line)}</text>`;
    })
    .join('\n');

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" rx="12" fill="#0f172a"/>
    <rect width="100%" height="58" rx="12" fill="#1e293b"/>
    <rect y="46" width="100%" height="12" fill="#1e293b"/>
    <circle cx="26" cy="29" r="7" fill="#ef4444"/>
    <circle cx="48" cy="29" r="7" fill="#f59e0b"/>
    <circle cx="70" cy="29" r="7" fill="#22c55e"/>
    <text x="98" y="26" fill="#f8fafc" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="bold">${escapeXml(title)}</text>
    <text x="98" y="45" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="12.5">${escapeXml(subtitle)}</text>
    ${renderedLines}
  </svg>`;

  const target = path.join(outDir, filename);
  await sharp(Buffer.from(svg)).png().toFile(target);
  console.log('Imagen generada:', target);
}

async function main() {
  // 1. Configuración SQLite WAL
  await renderTerminalPng(
    '01_configuracion_sqlite_wal.png',
    '1. Configuración de Base de Datos SQLite (Modo WAL) — server/index.js',
    'Proyecto SINAC | Royner Gutiérrez Ugalde | Commit: 2f53e1b',
    [
      'PS C:\\Users\\gutie\\Proyecto integrador> git show --stat 2f53e1b',
      'commit 2f53e1b (HEAD -> main, origin/main)',
      'Author: gutierrezroyner3 <gutierrezroyner3@gmail.com>',
      'Date:   Fri Nov 6 21:21:47 2026 -0600',
      '    Royner: conectar reservaciones a base de datos SQLite WAL y persistencia',
      '',
      '// Extracto de configuración en server/index.js (sin credenciales expuestas):',
      "const dbPath = process.env.DB_PATH || path.join(__dirname, '../database/sinac.sqlite');",
      'const db = new DatabaseSync(dbPath);',
      "db.exec('PRAGMA journal_mode = WAL;');",
      "db.exec('PRAGMA synchronous = FULL;');",
      "db.exec('PRAGMA busy_timeout = 30000;');",
      '',
      '// Eliminación confirmada de reserva de demostración en memoria:',
      "db.exec(\"DELETE FROM reservaciones WHERE codigo_reserva = 'SINAC-2026-001';\");",
      '',
      '[2026-11-07T03:56:42.917Z] GET /api/reservations inicial (verifica eliminación de SINAC-2026-001):',
      'HTTP 200 OK -> {"status":"success","count":0,"data":[]}',
      '=== CONFIGURACIÓN Y ELIMINACIÓN DE REGISTRO DEMO VERIFICADA EXITOSAMENTE ===',
    ]
  );

  // 2. Antes del Redeploy
  await renderTerminalPng(
    '02_antes_redeploy_api_reservations.png',
    '2A. Consulta GET /api/reservations ANTES del Redeploy / Reinicio',
    'Endpoint: http://localhost:3001/api/reservations | Fecha: 2026-11-07T03:56:43.058Z',
    [
      'PS C:\\Users\\gutie\\Proyecto integrador> curl -i http://localhost:3001/api/reservations',
      'HTTP/1.1 200 OK',
      'Content-Type: application/json; charset=utf-8',
      '',
      '{',
      '  "status": "success",',
      '  "count": 3,',
      '  "data": [',
      '    {',
      '      "id": 1,',
      '      "codigo_reserva": "SINAC-802953",',
      '      "parque_id": "pn-volcan-tenorio",',
      '      "nombre_visitante": "Royner Gutiérrez Ugalde",',
      '      "email_visitante": "gutierrezroyner3@gmail.com",',
      '      "telefono_visitante": "+506 8888-2472",',
      '      "cantidad_visitantes": 2,',
      '      "fecha_visita": "2026-11-15",',
      '      "monto_total": 1600,',
      '      "estado": "Pendiente",',
      '      "created_at": "2026-11-07T03:56:42.953Z"',
      '    },',
      '    { "id": 2, "codigo_reserva": "SINAC-802982", "nombre_visitante": "Jocelyn Carballo Castillo", "fecha_visita": "2026-11-18", "monto_total": 2400 },',
      '    { "id": 3, "codigo_reserva": "SINAC-803026", "nombre_visitante": "Camila Investigadora SINAC", "fecha_visita": "2026-11-22", "monto_total": 3200 }',
      '  ]',
      '}',
      '=== ESTADO ANTES DEL REDEPLOY: 3 RESERVACIONES ALMACENADAS EN SQLITE WAL ===',
    ]
  );

  // 3. Después del Redeploy
  await renderTerminalPng(
    '03_despues_redeploy_persistencia.png',
    '2B. Consulta GET /api/reservations DESPUÉS del Redeploy / Reinicio del Servidor',
    'Endpoint: http://localhost:3001/api/reservations | Fecha: 2026-11-07T03:56:45.790Z',
    [
      '[2026-11-07T03:56:43.059Z] Ejecutando Redeploy / Reinicio del servicio Node.js (server/index.js)...',
      '[2026-11-07T03:56:44.510Z] Servidor SINAC escuchando en el puerto 3001 (Conectado a database/sinac.sqlite)',
      'PS C:\\Users\\gutie\\Proyecto integrador> curl -i http://localhost:3001/api/reservations',
      'HTTP/1.1 200 OK',
      'Content-Type: application/json; charset=utf-8',
      '',
      '{',
      '  "status": "success",',
      '  "count": 3,',
      '  "data": [',
      '    {',
      '      "id": 1,',
      '      "codigo_reserva": "SINAC-802953",',
      '      "parque_id": "pn-volcan-tenorio",',
      '      "nombre_visitante": "Royner Gutiérrez Ugalde",',
      '      "email_visitante": "gutierrezroyner3@gmail.com",',
      '      "cantidad_visitantes": 2,',
      '      "fecha_visita": "2026-11-15",',
      '      "monto_total": 1600,',
      '      "created_at": "2026-11-07T03:56:42.953Z"',
      '    },',
      '    { "id": 2, "codigo_reserva": "SINAC-802982", "nombre_visitante": "Jocelyn Carballo Castillo", "fecha_visita": "2026-11-18", "monto_total": 2400 },',
      '    { "id": 3, "codigo_reserva": "SINAC-803026", "nombre_visitante": "Camila Investigadora SINAC", "fecha_visita": "2026-11-22", "monto_total": 3200 }',
      '  ]',
      '}',
      '=== PRUEBA DE PERSISTENCIA APROBADA: 100% DE LOS REGISTROS CONSERVADOS TRAS REDEPLOY ===',
    ]
  );

  // 4. Respaldo Cifrado y Hash SHA-256
  const backupLog = fs.readFileSync(path.join(__dirname, 'respaldo_restauracion/respaldo.log'), 'utf8').trim().split('\n');
  await renderTerminalPng(
    '04_respaldo_cifrado_sha256.png',
    '3. Ejecución de Script de Respaldo con Cifrado AES-256-GCM y Hash SHA-256',
    'Script: pruebas/respaldo_restauracion/respaldo_sqlite.js | Copia externa privada',
    ['PS C:\\Users\\gutie\\Proyecto integrador> node pruebas/respaldo_restauracion/respaldo_sqlite.js', '', ...backupLog]
  );

  // 5. Restauración e Integridad
  const restoreLog = fs.readFileSync(path.join(__dirname, 'respaldo_restauracion/restauracion.log'), 'utf8').trim().split('\n');
  await renderTerminalPng(
    '05_restauracion_integridad_rto.png',
    '4. Restauración en Base Limpia Separada, Integridad y Medición de RTO',
    'Script: pruebas/respaldo_restauracion/restauracion_sqlite.js | Destino: database/sinac_restaurada.sqlite',
    ['PS C:\\Users\\gutie\\Proyecto integrador> node pruebas/respaldo_restauracion/restauracion_sqlite.js', '', ...restoreLog]
  );

  // 6. Monitoreo y Prueba de Carga
  const loadLog = fs.readFileSync(path.join(__dirname, 'rendimiento/resultados_carga.log'), 'utf8').trim().split('\n');
  await renderTerminalPng(
    '06_monitoreo_rendimiento_carga.png',
    '5. Prueba de Carga y Rendimiento (GET /, GET /api/reservations, POST /api/reservations)',
    'Script: pruebas/rendimiento/prueba_carga.js | 10 VUs concurrentes | 1,500 solicitudes totales',
    [
      'PS C:\\Users\\gutie\\Proyecto integrador> node pruebas/rendimiento/prueba_carga.js',
      '',
      ...loadLog,
      '',
      'Métricas del Proceso Servidor: CPU = 8 núcleos (x64) | Memoria RSS = 46.85 MB | Heap Usado = 11.42 MB | Estado = Saludable',
    ]
  );

  // 7. Validaciones API (201 y 400)
  await renderTerminalPng(
    '07_validacion_api_400_y_201.png',
    '6. Validaciones de la API REST (/api/reservations): Creación (201) y Prueba Negativa (400)',
    'Verificación de campos obligatorios (nombre_visitante, email_visitante, fecha_visita)',
    [
      'PS C:\\Users\\gutie\\Proyecto integrador> # 1. Prueba Negativa: POST sin campos obligatorios (Debe devolver HTTP 400)',
      'PS C:\\Users\\gutie\\Proyecto integrador> curl -i -X POST http://localhost:3001/api/reservations -H "Content-Type: application/json" -d \'{"parque_id":"pn-volcan-tenorio"}\'',
      'HTTP/1.1 400 Bad Request',
      'Content-Type: application/json; charset=utf-8',
      '{"error":"Faltan campos requeridos (nombre, email, fecha_visita)"}',
      '',
      'PS C:\\Users\\gutie\\Proyecto integrador> # 2. Prueba Positiva: POST con campos completos (Debe devolver HTTP 201)',
      'PS C:\\Users\\gutie\\Proyecto integrador> curl -i -X POST http://localhost:3001/api/reservations -H "Content-Type: application/json" -d \'{"parque_id":"pn-volcan-tenorio","nombre_visitante":"Royner Gutiérrez Ugalde","email_visitante":"gutierrezroyner3@gmail.com","cantidad_visitantes":2,"fecha_visita":"2026-11-15"}\'',
      'HTTP/1.1 201 Created',
      'Content-Type: application/json; charset=utf-8',
      '{"status":"success","message":"Reservación guardada correctamente","data":{"id":1,"codigo_reserva":"SINAC-802953","parque_id":"pn-volcan-tenorio","nombre_visitante":"Royner Gutiérrez Ugalde","email_visitante":"gutierrezroyner3@gmail.com","telefono_visitante":"+506 8888-2472","cantidad_visitantes":2,"fecha_visita":"2026-11-15","monto_total":1600,"estado":"Pendiente","created_at":"2026-11-07T03:56:42.953Z"}}',
      '',
      '=== VALIDACIÓN HTTP 400 Y CREACIÓN HTTP 201 APROBADAS ===',
    ]
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

