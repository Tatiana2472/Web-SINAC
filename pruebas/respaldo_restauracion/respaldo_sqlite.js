import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DatabaseSync, backup } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDbPath = process.env.DB_PATH || path.join(__dirname, '../../database/sinac.sqlite');
const externalBackupDir = process.env.BACKUP_DIR || 'C:\\Users\\gutie\\Respaldos_Privados_SINAC';
const logPath = path.join(__dirname, 'respaldo.log');

// Clave de cifrado derivada desde variable de entorno (o clave de respaldo institucional en pruebas)
const passphrase = process.env.BACKUP_PASSPHRASE || 'SINAC-Tenorio-Respaldo-2026-ClaveSegura!';

async function ejecutarRespaldo() {
  const inicio = performance.now();
  const timestamp = new Date().toISOString();
  const fileStamp = timestamp.replace(/[:.]/g, '-');

  fs.mkdirSync(externalBackupDir, { recursive: true });

  const tempBackupSqlite = path.join(externalBackupDir, `sinac_backup_${fileStamp}.sqlite`);
  const encryptedBackupPath = path.join(externalBackupDir, `sinac_backup_${fileStamp}.sqlite.enc`);
  const hashFilePath = path.join(externalBackupDir, `sinac_backup_${fileStamp}.sha256`);

  const logs = [];
  const log = (msg) => {
    const line = `[${new Date().toISOString()}] ${msg}`;
    console.log(line);
    logs.push(line);
  };

  log('=== INICIO DE RESPALDO DE BASE DE DATOS SQLITE (MODO WAL) ===');
  log(`Base de datos origen: ${sourceDbPath}`);
  log(`Ubicación externa privada: ${externalBackupDir}`);

  // 1. Verificar estado de la base de origen y conteo
  const dbOrigen = new DatabaseSync(sourceDbPath);
  const journalMode = dbOrigen.prepare('PRAGMA journal_mode;').get().journal_mode;
  const totalRegistros = dbOrigen.prepare('SELECT COUNT(*) AS total FROM reservaciones;').get().total;
  log(`Modo de journal verificado: ${journalMode}`);
  log(`Registros actuales en tabla 'reservaciones': ${totalRegistros}`);

  // 2. Generar respaldo en caliente consistente usando la API nativa backup() de SQLite
  await backup(dbOrigen, tempBackupSqlite);
  dbOrigen.close();
  log(`Copia consistente SQLite completada: ${path.basename(tempBackupSqlite)}`);

  // 3. Cifrar el archivo de respaldo con AES-256-GCM
  const rawBuffer = fs.readFileSync(tempBackupSqlite);
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(passphrase, salt, 32);

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encryptedContent = Buffer.concat([cipher.update(rawBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Formato del archivo cifrado: [SALT (16B)] + [IV (12B)] + [AUTH_TAG (16B)] + [CIPHERTEXT]
  const payload = Buffer.concat([salt, iv, authTag, encryptedContent]);
  fs.writeFileSync(encryptedBackupPath, payload);

  // Eliminar copia temporal sin cifrar para dejar únicamente el archivo cifrado
  fs.unlinkSync(tempBackupSqlite);

  // 4. Calcular hashes SHA-256
  const sha256Original = crypto.createHash('sha256').update(rawBuffer).digest('hex');
  const sha256Encrypted = crypto.createHash('sha256').update(payload).digest('hex');
  const statsCifrado = fs.statSync(encryptedBackupPath);

  fs.writeFileSync(
    hashFilePath,
    `SHA256_ENCRYPTED=${sha256Encrypted}  ${path.basename(encryptedBackupPath)}\nSHA256_SQLITE_RAW=${sha256Original}\nTOTAL_REGISTROS=${totalRegistros}\nTIMESTAMP=${timestamp}\n`
  );

  const duracionMs = (performance.now() - inicio).toFixed(2);

  log(`Método de cifrado: AES-256-GCM (derivación de clave scrypt, salt=16B, iv=12B, tag=16B)`);
  log(`Archivo cifrado generado: ${encryptedBackupPath}`);
  log(`Tamaño base original: ${rawBuffer.length} bytes (${(rawBuffer.length / 1024).toFixed(2)} KB)`);
  log(`Tamaño archivo cifrado: ${statsCifrado.size} bytes (${(statsCifrado.size / 1024).toFixed(2)} KB)`);
  log(`Hash SHA-256 (archivo cifrado .enc): ${sha256Encrypted}`);
  log(`Hash SHA-256 (base SQLite original): ${sha256Original}`);
  log(`Archivo de verificación hash: ${hashFilePath}`);
  log(`Tiempo total de respaldo y cifrado: ${duracionMs} ms`);
  log('=== RESPALDO FINALIZADO EXITOSAMENTE (CÓDIGO 0) ===');

  fs.writeFileSync(logPath, logs.join('\n') + '\n', 'utf8');

  // Guardar metadatos del último respaldo para el script de restauración
  fs.writeFileSync(
    path.join(__dirname, 'ultimo_respaldo.json'),
    JSON.stringify(
      {
        timestamp,
        sourceDbPath,
        encryptedBackupPath,
        hashFilePath,
        sha256Encrypted,
        sha256Original,
        rawSizeBytes: rawBuffer.length,
        encryptedSizeBytes: statsCifrado.size,
        totalRegistros,
        duracionMs: Number(duracionMs),
      },
      null,
      2
    ),
    'utf8'
  );
}

ejecutarRespaldo().catch((err) => {
  console.error('Error en el respaldo:', err);
  process.exit(1);
});

