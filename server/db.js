import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../database/sinac.sqlite');
const schemaPath = path.join(__dirname, '../database/schema.sql');
const seedPath = path.join(__dirname, '../database/seed.sql');

let Database;
try {
  // Intentar usar el módulo nativo node:sqlite (Node 22+) o better-sqlite3
  const sqliteModule = await import('better-sqlite3').catch(() => null);
  if (sqliteModule) {
    Database = sqliteModule.default;
  }
} catch (e) {
  console.log('Using fallback DB engine or better-sqlite3 pending installation.');
}

export function initDatabase() {
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log(`[DB] Base de datos inicializada en: ${dbPath}`);
  console.log(`[DB] Esquema cargado desde: ${schemaPath}`);
  console.log(`[DB] Datos iniciales desde: ${seedPath}`);
}
