import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const metaPath = path.join(__dirname, 'ultimo_respaldo.json');
const restoredDbPath = path.join(__dirname, '../../database/sinac_restaurada.sqlite');
const logPath = path.join(__dirname, 'restauracion.log');
const passphrase = process.env.BACKUP_PASSPHRASE || 'SINAC-Tenorio-Respaldo-2026-ClaveSegura!';

function ejecutarRestauracion() {
  const logs = [];
  const log = (msg) => {
    const line = `[${new Date().toISOString()}] ${msg}`;
    console.log(line);
    logs.push(line);
  };

  if (!fs.existsSync(metaPath)) {
    throw new Error('No se encontró ultimo_respaldo.json. Ejecute primero respaldo_sqlite.js');
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

  // Limpiar cualquier base restaurada previa para garantizar una base limpia y separada
  for (const ext of ['', '-wal', '-shm']) {
    const p = `${restoredDbPath}${ext}`;
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  const inicio = performance.now();

  log('=== INICIO DE RESTAURACIÓN EN BASE DE DATOS LIMPIA Y SEPARADA ===');
  log(`Archivo cifrado origen: ${meta.encryptedBackupPath}`);
  log(`Base de datos destino (limpia y separada): ${restoredDbPath}`);
  log(`Estado inicial del destino: No existe (base limpia verificada)`);

  // 1. Leer archivo cifrado y verificar Hash SHA-256 antes de restaurar
  const payload = fs.readFileSync(meta.encryptedBackupPath);
  const hashCalculado = crypto.createHash('sha256').update(payload).digest('hex');

  log(`Hash SHA-256 esperado (.enc):  ${meta.sha256Encrypted}`);
  log(`Hash SHA-256 calculado (.enc): ${hashCalculado}`);

  if (hashCalculado !== meta.sha256Encrypted) {
    throw new Error('ERROR DE INTEGRIDAD: El hash SHA-256 del archivo cifrado no coincide');
  }
  log('Verificación de hash SHA-256 del respaldo cifrado: OK ( coincidencia exacta )');

  // 2. Descifrar con AES-256-GCM
  const salt = payload.subarray(0, 16);
  const iv = payload.subarray(16, 28);
  const authTag = payload.subarray(28, 44);
  const ciphertext = payload.subarray(44);

  const key = crypto.scryptSync(passphrase, salt, 32);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  const sqliteBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const sha256SqliteRestaurado = crypto.createHash('sha256').update(sqliteBuffer).digest('hex');

  log(`Descifrado AES-256-GCM: OK`);
  log(`Hash SHA-256 SQLite descifrado: ${sha256SqliteRestaurado}`);

  // 3. Escribir la base restaurada en ubicación separada
  fs.writeFileSync(restoredDbPath, sqliteBuffer);

  // 4. Comprobar integridad con PRAGMA integrity_check y comparar conteos
  const dbRestaurada = new DatabaseSync(restoredDbPath);
  const integrityResult = dbRestaurada.prepare('PRAGMA integrity_check;').get().integrity_check;
  const conteoRestaurado = dbRestaurada.prepare('SELECT COUNT(*) AS total FROM reservaciones;').get().total;
  const registrosRestaurados = dbRestaurada.prepare('SELECT codigo_reserva, nombre_visitante, fecha_visita, monto_total FROM reservaciones ORDER BY id ASC;').all();
  dbRestaurada.close();

  const dbOriginal = new DatabaseSync(meta.sourceDbPath);
  const conteoOriginal = dbOriginal.prepare('SELECT COUNT(*) AS total FROM reservaciones;').get().total;
  dbOriginal.close();

  const duracionMs = (performance.now() - inicio).toFixed(2);
  const duracionSeg = (Number(duracionMs) / 1000).toFixed(4);

  log(`Resultado de PRAGMA integrity_check: ${integrityResult}`);
  log(`Conteo de registros en base original (antes del respaldo): ${conteoOriginal}`);
  log(`Conteo de registros en base restaurada (después de restaurar): ${conteoRestaurado}`);
  log(`Diferencia de registros (faltantes): ${conteoOriginal - conteoRestaurado}`);
  log(`Detalle de registros recuperados: ${JSON.stringify(registrosRestaurados)}`);
  log(`Tiempo total medido de restauración (RTO real): ${duracionMs} ms (${duracionSeg} segundos)`);
  log('=== RESTAURACIÓN FINALIZADA EXITOSAMENTE (CÓDIGO 0) ===');

  fs.writeFileSync(logPath, logs.join('\n') + '\n', 'utf8');
}

ejecutarRestauracion();

