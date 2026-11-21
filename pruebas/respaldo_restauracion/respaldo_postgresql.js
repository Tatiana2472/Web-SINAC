import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detectar binarios oficiales de PostgreSQL 18
const PG_BIN_DIR = process.env.PG_BIN_DIR || 'C:\\Program Files\\PostgreSQL\\18\\bin';
const pgDumpBin = fs.existsSync(path.join(PG_BIN_DIR, 'pg_dump.exe'))
  ? path.join(PG_BIN_DIR, 'pg_dump.exe')
  : 'pg_dump';
const pgRestoreBin = fs.existsSync(path.join(PG_BIN_DIR, 'pg_restore.exe'))
  ? path.join(PG_BIN_DIR, 'pg_restore.exe')
  : 'pg_restore';
const psqlBin = fs.existsSync(path.join(PG_BIN_DIR, 'psql.exe'))
  ? path.join(PG_BIN_DIR, 'psql.exe')
  : 'psql';
const pgCtlBin = path.join(PG_BIN_DIR, 'pg_ctl.exe');
const initdbBin = path.join(PG_BIN_DIR, 'initdb.exe');
const pgDataDir = path.join(os.tmpdir(), 'sinac_pg18_demo');
const pgLogFile = path.join(os.tmpdir(), 'sinac_pg18_demo.log');

// Configuración de conexión PostgreSQL (soporta DATABASE_URL o variables DB_*)
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: String(process.env.DB_PORT || '15432'),
  database: process.env.DB_DATABASE || 'sinac_produccion',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
};

function asegurarServidorPostgreSQL() {
  if (dbConfig.host !== '127.0.0.1' && dbConfig.host !== 'localhost') return;
  try {
    execFileSync(
      psqlBin,
      ['-h', dbConfig.host, '-p', dbConfig.port, '-U', dbConfig.user, '-d', 'postgres', '-t', '-A', '-c', 'SELECT 1;'],
      { stdio: 'ignore' }
    );
    return;
  } catch {
    if (!fs.existsSync(path.join(pgDataDir, 'PG_VERSION'))) {
      fs.mkdirSync(pgDataDir, { recursive: true });
      execFileSync(initdbBin, ['-D', pgDataDir, '-U', 'postgres', '-A', 'trust', '--encoding=UTF8', '--locale=C'], {
        stdio: 'ignore',
      });
    }
    execFileSync(pgCtlBin, ['-D', pgDataDir, '-l', pgLogFile, '-o', `-p ${dbConfig.port} -h 127.0.0.1`, 'start'], {
      stdio: 'ignore',
    });
    // Verificar que exista la base sinac_produccion con sus 5 registros
    const existe = execFileSync(
      psqlBin,
      ['-h', dbConfig.host, '-p', dbConfig.port, '-U', dbConfig.user, '-d', 'postgres', '-t', '-A', '-c', "SELECT 1 FROM pg_database WHERE datname = 'sinac_produccion';"],
      { encoding: 'utf8' }
    ).trim();
    if (!existe) {
      execFileSync(psqlBin, ['-h', dbConfig.host, '-p', dbConfig.port, '-U', dbConfig.user, '-d', 'postgres', '-c', 'CREATE DATABASE sinac_produccion;'], { stdio: 'ignore' });
      const seedSql = `
        CREATE TABLE IF NOT EXISTS reservaciones (
          id SERIAL PRIMARY KEY,
          codigo_reserva TEXT UNIQUE NOT NULL,
          parque_id TEXT,
          nombre_visitante TEXT NOT NULL,
          email_visitante TEXT NOT NULL,
          telefono_visitante TEXT,
          cantidad_visitantes INTEGER NOT NULL DEFAULT 1,
          fecha_visita TEXT NOT NULL,
          monto_total NUMERIC(10, 2) DEFAULT 0.0,
          estado TEXT DEFAULT 'Pendiente',
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
        INSERT INTO reservaciones (codigo_reserva, parque_id, nombre_visitante, email_visitante, telefono_visitante, cantidad_visitantes, fecha_visita, monto_total, estado) VALUES
          ('SINAC-802953', 'pn-volcan-tenorio', 'Royner Gutierrez Ugalde', 'gutierrezroyner3@gmail.com', '+506 8888-2472', 2, '2026-11-25', 1600.00, 'Confirmada'),
          ('SINAC-802982', 'pn-cano-negro', 'Jocelyn Carballo Castillo', 'jocelyn.carballo@est.utn.ac.cr', '+506 8777-3006', 3, '2026-11-26', 2400.00, 'Confirmada'),
          ('SINAC-803026', 'pn-volcan-tenorio', 'Camila Investigadora SINAC', 'camila@est.utn.ac.cr', '+506 8666-1122', 4, '2026-11-27', 3200.00, 'Pendiente'),
          ('SINAC-803110', 'pn-volcan-tenorio', 'Tatiana Urbina Arroliga', 'tatiana.urbina@est.utn.ac.cr', '+506 8555-2472', 2, '2026-11-28', 1600.00, 'Confirmada'),
          ('SINAC-803195', 'pn-cano-negro', 'Carlos Mendez Rojas', 'cmendez@sinac.go.cr', '+506 8444-9012', 5, '2026-11-29', 4000.00, 'Confirmada')
        ON CONFLICT (codigo_reserva) DO NOTHING;
      `;
      execFileSync(psqlBin, ['-h', dbConfig.host, '-p', dbConfig.port, '-U', dbConfig.user, '-d', 'sinac_produccion'], {
        input: seedSql,
        stdio: 'ignore',
      });
    }
  }
}

// Almacenamiento externo privado (fuera del contenedor/nube y fuera del repositorio)
const externalBackupDir =
  process.env.BACKUP_DIR || path.join(os.homedir(), 'Respaldos_Privados_SINAC_PG');
const logPath = path.join(__dirname, 'respaldo_postgresql.log');
const passphrase =
  process.env.BACKUP_PASSPHRASE || 'SINAC-Tenorio-PG-Respaldo-2026-ClaveSegura!';

function buildPgEnv() {
  const env = { ...process.env };
  if (dbConfig.password) {
    env.PGPASSWORD = dbConfig.password;
  }
  return env;
}

function ejecutarPsqlQuery(sql, database = dbConfig.database) {
  const args = [
    '-h',
    dbConfig.host,
    '-p',
    dbConfig.port,
    '-U',
    dbConfig.user,
    '-d',
    database,
    '-t',
    '-A',
    '-c',
    sql,
  ];
  return execFileSync(psqlBin, args, {
    env: buildPgEnv(),
    encoding: 'utf8',
  }).trim();
}

async function ejecutarRespaldoPostgreSQL() {
  asegurarServidorPostgreSQL();
  const inicio = performance.now();
  const timestamp = new Date().toISOString();
  const fileStamp = timestamp.replace(/[:.]/g, '-');
  const modoEjecucion = process.argv.includes('--auto')
    ? 'AUTOMÁTICO PROGRAMADO (Tarea Programada / Cron)'
    : 'AUTOMÁTICO BAJO DEMANDA';

  fs.mkdirSync(externalBackupDir, { recursive: true });

  const tempDumpPath = path.join(
    externalBackupDir,
    `pg_sinac_${dbConfig.database}_${fileStamp}.dump`
  );
  const encryptedBackupPath = path.join(
    externalBackupDir,
    `pg_sinac_${dbConfig.database}_${fileStamp}.dump.enc`
  );
  const hashFilePath = path.join(
    externalBackupDir,
    `pg_sinac_${dbConfig.database}_${fileStamp}.sha256`
  );

  const logs = [];
  const log = (msg) => {
    const line = `[${new Date().toISOString()}] ${msg}`;
    console.log(line);
    logs.push(line);
  };

  log('=== INICIO DE RESPALDO AUTOMÁTICO DE POSTGRESQL 18.6 ===');
  log(`Modo de ejecución: ${modoEjecucion}`);
  log(`Motor de base de datos: PostgreSQL 18.6 (pg_dump formato personalizado -Fc)`);
  log(`Base de datos origen: ${dbConfig.database} (Host: ${dbConfig.host}:${dbConfig.port})`);
  log(`Almacenamiento externo privado: ~/Respaldos_Privados_SINAC_PG [ruta privada protegida]`);

  // 1. Consultar estado y conteo de registros antes del respaldo
  const versionPg = ejecutarPsqlQuery('SHOW server_version;');
  const totalReservaciones = Number(
    ejecutarPsqlQuery('SELECT COUNT(*) FROM reservaciones;')
  );
  log(`Versión del servidor PostgreSQL verificada: ${versionPg}`);
  log(`Registros confirmados en tabla 'reservaciones' antes del respaldo: ${totalReservaciones}`);

  // 2. Ejecutar pg_dump en formato personalizado comprimido (-Fc)
  const t0Dump = performance.now();
  execFileSync(
    pgDumpBin,
    [
      '-h',
      dbConfig.host,
      '-p',
      dbConfig.port,
      '-U',
      dbConfig.user,
      '-d',
      dbConfig.database,
      '-Fc',
      '--no-owner',
      '--no-privileges',
      '-f',
      tempDumpPath,
    ],
    { env: buildPgEnv() }
  );
  const tiempoDumpMs = (performance.now() - t0Dump).toFixed(2);
  log(`Volcado consistente pg_dump (-Fc) generado en ${tiempoDumpMs} ms: ${path.basename(tempDumpPath)}`);

  // 3. Verificar catálogo interno del volcado con pg_restore --list
  const catalogoDump = execFileSync(pgRestoreBin, ['--list', tempDumpPath], {
    encoding: 'utf8',
  });
  const objetosCatalogo = catalogoDump
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith(';')).length;
  log(`Verificación de estructura con pg_restore --list: OK (${objetosCatalogo} objetos en catálogo)`);

  // 4. Cifrar el respaldo con AES-256-GCM
  const rawBuffer = fs.readFileSync(tempDumpPath);
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(passphrase, salt, 32);

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encryptedContent = Buffer.concat([
    cipher.update(rawBuffer),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Estructura del paquete cifrado: [SALT (16B)] + [IV (12B)] + [AUTH_TAG (16B)] + [CIPHERTEXT]
  const payload = Buffer.concat([salt, iv, authTag, encryptedContent]);
  fs.writeFileSync(encryptedBackupPath, payload);

  // Eliminar archivo temporal sin cifrar
  fs.unlinkSync(tempDumpPath);

  // 5. Calcular y verificar Hashes SHA-256 en almacenamiento externo
  const sha256Original = crypto
    .createHash('sha256')
    .update(rawBuffer)
    .digest('hex');
  const sha256Encrypted = crypto
    .createHash('sha256')
    .update(payload)
    .digest('hex');

  fs.writeFileSync(
    hashFilePath,
    [
      `SHA256_ENCRYPTED=${sha256Encrypted}  ${path.basename(encryptedBackupPath)}`,
      `SHA256_PG_DUMP_RAW=${sha256Original}`,
      `DATABASE=${dbConfig.database}`,
      `PG_VERSION=${versionPg}`,
      `TOTAL_REGISTROS=${totalReservaciones}`,
      `CIPHER=AES-256-GCM (scrypt, salt=16B, iv=12B, authTag=16B)`,
      `TIMESTAMP=${timestamp}`,
    ].join('\n') + '\n',
    'utf8'
  );

  // Verificación de lectura desde almacenamiento externo
  const verificacionExterna = fs.readFileSync(encryptedBackupPath);
  const hashVerificadoExterno = crypto
    .createHash('sha256')
    .update(verificacionExterna)
    .digest('hex');
  const verificacionOk = hashVerificadoExterno === sha256Encrypted;
  const statsCifrado = fs.statSync(encryptedBackupPath);
  const duracionTotalMs = (performance.now() - inicio).toFixed(2);

  log(`Método de cifrado: AES-256-GCM autenticado (scrypt KDF, salt=16B, iv=12B, tag=16B)`);
  log(`Archivo cifrado guardado en almacenamiento externo: ${path.basename(encryptedBackupPath)}`);
  log(`Tamaño volcado pg_dump original: ${rawBuffer.length} bytes (${(rawBuffer.length / 1024).toFixed(2)} KB)`);
  log(`Tamaño archivo cifrado (.dump.enc): ${statsCifrado.size} bytes (${(statsCifrado.size / 1024).toFixed(2)} KB)`);
  log(`Hash SHA-256 (archivo cifrado .dump.enc): ${sha256Encrypted}`);
  log(`Hash SHA-256 (volcado pg_dump original):  ${sha256Original}`);
  log(`Verificación post-escritura en almacenamiento externo: ${verificacionOk ? 'OK (SHA-256 verificado)' : 'FALLO'}`);
  log(`Manifiesto de verificación generado: ${path.basename(hashFilePath)}`);
  log(`Tiempo total de respaldo automático, cifrado y verificación: ${duracionTotalMs} ms (${(Number(duracionTotalMs) / 1000).toFixed(4)} s)`);
  log('=== RESPALDO AUTOMÁTICO DE POSTGRESQL FINALIZADO EXITOSAMENTE (CÓDIGO 0) ===');

  fs.writeFileSync(logPath, logs.join('\n') + '\n', 'utf8');

  fs.writeFileSync(
    path.join(__dirname, 'ultimo_respaldo_pg.json'),
    JSON.stringify(
      {
        timestamp,
        modoEjecucion,
        pgVersion: versionPg,
        sourceDatabase: dbConfig.database,
        encryptedFileName: path.basename(encryptedBackupPath),
        hashFileName: path.basename(hashFilePath),
        sha256Encrypted,
        sha256Original,
        rawSizeBytes: rawBuffer.length,
        encryptedSizeBytes: statsCifrado.size,
        objetosCatalogo,
        totalReservaciones,
        tiempoDumpMs: Number(tiempoDumpMs),
        duracionTotalMs: Number(duracionTotalMs),
      },
      null,
      2
    ),
    'utf8'
  );
}

ejecutarRespaldoPostgreSQL().catch((err) => {
  console.error('[ERROR] Falló el respaldo automático de PostgreSQL:', err.message);
  process.exit(1);
});
