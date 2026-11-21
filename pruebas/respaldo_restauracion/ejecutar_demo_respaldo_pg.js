import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PG_BIN_DIR = 'C:\\Program Files\\PostgreSQL\\18\\bin';
const initdbBin = path.join(PG_BIN_DIR, 'initdb.exe');
const pgCtlBin = path.join(PG_BIN_DIR, 'pg_ctl.exe');
const psqlBin = path.join(PG_BIN_DIR, 'psql.exe');

const pgDataDir = path.join(os.tmpdir(), 'sinac_pg18_demo');
const pgLogFile = path.join(os.tmpdir(), 'sinac_pg18_demo.log');
const PG_PORT = '15432';

function psql(sql, db = 'postgres') {
  return execFileSync(
    psqlBin,
    ['-h', '127.0.0.1', '-p', PG_PORT, '-U', 'postgres', '-d', db, '-t', '-A'],
    {
      input: sql,
      encoding: 'utf8',
      env: { ...process.env, PGCLIENTENCODING: 'UTF8' },
    }
  ).trim();
}

async function main() {
  console.log('=== 1. PREPARANDO INSTANCIA POSTGRESQL 18.6 PARA DEMOSTRACIÓN ===');

  // Detener instancia previa si existiera
  if (fs.existsSync(path.join(pgDataDir, 'postmaster.pid'))) {
    try {
      execFileSync(pgCtlBin, ['-D', pgDataDir, 'stop', '-m', 'immediate'], { stdio: 'ignore' });
    } catch {}
  }

  if (!fs.existsSync(path.join(pgDataDir, 'PG_VERSION'))) {
    fs.mkdirSync(pgDataDir, { recursive: true });
    execFileSync(
      initdbBin,
      ['-D', pgDataDir, '-U', 'postgres', '-A', 'trust', '--encoding=UTF8', '--locale=C'],
      { stdio: 'inherit' }
    );
  }

  // Iniciar PostgreSQL 18.6 en puerto 5433
  execFileSync(
    pgCtlBin,
    ['-D', pgDataDir, '-l', pgLogFile, '-o', `-p ${PG_PORT} -h 127.0.0.1`, 'start'],
    { stdio: 'inherit' }
  );

  try {
    // Crear base de datos de producción y poblar reservaciones reales
    psql('DROP DATABASE IF EXISTS sinac_produccion;');
    psql('CREATE DATABASE sinac_produccion;');

    psql(
      `
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

      INSERT INTO reservaciones (
        codigo_reserva, parque_id, nombre_visitante, email_visitante,
        telefono_visitante, cantidad_visitantes, fecha_visita, monto_total, estado
      ) VALUES
        ('SINAC-802953', 'pn-volcan-tenorio', 'Royner Gutiérrez Ugalde', 'gutierrezroyner3@gmail.com', '+506 8888-2472', 2, '2026-11-25', 1600.00, 'Confirmada'),
        ('SINAC-802982', 'pn-cano-negro', 'Jocelyn Carballo Castillo', 'jocelyn.carballo@est.utn.ac.cr', '+506 8777-3006', 3, '2026-11-26', 2400.00, 'Confirmada'),
        ('SINAC-803026', 'pn-volcan-tenorio', 'Camila Investigadora SINAC', 'camila@est.utn.ac.cr', '+506 8666-1122', 4, '2026-11-27', 3200.00, 'Pendiente'),
        ('SINAC-803110', 'pn-volcan-tenorio', 'Tatiana Urbina Arroliga', 'tatiana.urbina@est.utn.ac.cr', '+506 8555-2472', 2, '2026-11-28', 1600.00, 'Confirmada'),
        ('SINAC-803195', 'pn-cano-negro', 'Carlos Méndez Rojas', 'cmendez@sinac.go.cr', '+506 8444-9012', 5, '2026-11-29', 4000.00, 'Confirmada');
      `,
      'sinac_produccion'
    );

    const envPg = {
      ...process.env,
      DB_HOST: '127.0.0.1',
      DB_PORT: PG_PORT,
      DB_DATABASE: 'sinac_produccion',
      DB_RESTORE_DATABASE: 'sinac_restaurada_limpia',
      DB_USERNAME: 'postgres',
    };

    console.log('\n=== 2. EJECUTANDO RESPALDO AUTOMÁTICO DE POSTGRESQL (respaldo_postgresql.js --auto) ===');
    execFileSync('node', [path.join(__dirname, 'respaldo_postgresql.js'), '--auto'], {
      env: envPg,
      stdio: 'inherit',
    });

    console.log('\n=== 3. EJECUTANDO RESTAURACIÓN EN AMBIENTE LIMPIO (restauracion_postgresql.js) ===');
    execFileSync('node', [path.join(__dirname, 'restauracion_postgresql.js')], {
      env: envPg,
      stdio: 'inherit',
    });
  } finally {
    execFileSync(pgCtlBin, ['-D', pgDataDir, 'stop', '-m', 'fast'], { stdio: 'inherit' });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
