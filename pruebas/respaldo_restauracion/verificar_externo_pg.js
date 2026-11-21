import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const externalBackupDir =
  process.env.BACKUP_DIR || path.join(os.homedir(), 'Respaldos_Privados_SINAC_PG');
const metaPath = path.join(__dirname, 'ultimo_respaldo_pg.json');

console.log('=== VERIFICACIÓN DE COPIA CIFRADA EN ALMACENAMIENTO EXTERNO ===');
console.log('Directorio externo:', externalBackupDir);

const archivos = fs.readdirSync(externalBackupDir);
for (const nombre of archivos) {
  const fullPath = path.join(externalBackupDir, nombre);
  const stat = fs.statSync(fullPath);
  console.log(` - ${nombre}  (${stat.size} bytes)`);
}

if (fs.existsSync(metaPath)) {
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const encPath = path.join(externalBackupDir, meta.encryptedFileName);
  const shaPath = path.join(externalBackupDir, meta.hashFileName);

  console.log('\n--- Contenido del Manifiesto SHA-256 (' + meta.hashFileName + ') ---');
  console.log(fs.readFileSync(shaPath, 'utf8').trim());

  const buffer = fs.readFileSync(encPath);
  const hashReal = crypto.createHash('sha256').update(buffer).digest('hex');
  console.log('\n--- Comprobación Criptográfica del Archivo Cifrado (.dump.enc) ---');
  console.log('SHA-256 registrado:', meta.sha256Encrypted);
  console.log('SHA-256 calculado: ', hashReal);
  console.log('Resultado:         ', hashReal === meta.sha256Encrypted ? 'OK (COINCIDENCIA EXACTA 100%)' : 'ERROR');
}
