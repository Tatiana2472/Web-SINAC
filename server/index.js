import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sitio compilado (carpeta dist/)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Configuración de Base de Datos SQLite (modo WAL)
const dbPath = process.env.DB_PATH || path.join(__dirname, '../database/sinac.sqlite');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA synchronous = FULL;');
db.exec('PRAGMA busy_timeout = 30000;');

db.exec(`
  CREATE TABLE IF NOT EXISTS reservaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_reserva TEXT UNIQUE NOT NULL,
    parque_id TEXT,
    nombre_visitante TEXT NOT NULL,
    email_visitante TEXT NOT NULL,
    telefono_visitante TEXT,
    cantidad_visitantes INTEGER NOT NULL DEFAULT 1,
    fecha_visita TEXT NOT NULL,
    monto_total REAL DEFAULT 0.0,
    estado TEXT DEFAULT 'Pendiente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Eliminar registro de demostración si existiera previamente
db.exec("DELETE FROM reservaciones WHERE codigo_reserva = 'SINAC-2026-001';");

const insertReservationStmt = db.prepare(`
  INSERT INTO reservaciones (
    codigo_reserva,
    parque_id,
    nombre_visitante,
    email_visitante,
    telefono_visitante,
    cantidad_visitantes,
    fecha_visita,
    monto_total,
    estado,
    created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const getAllReservationsStmt = db.prepare(`
  SELECT
    id,
    codigo_reserva,
    parque_id,
    nombre_visitante,
    email_visitante,
    telefono_visitante,
    cantidad_visitantes,
    fecha_visita,
    monto_total,
    estado,
    created_at
  FROM reservaciones
  ORDER BY id ASC
`);

let lastCodeSuffix = 0;
function generarCodigoReserva() {
  const base = Number(Date.now().toString().slice(-6));
  lastCodeSuffix = base <= lastCodeSuffix ? lastCodeSuffix + 1 : base;
  return `SINAC-${String(lastCodeSuffix).padStart(6, '0')}`;
}

// --- ENDPOINTS REST API SINAC ---

app.get('/api/conservation-areas', (req, res) => {
  res.json({ status: 'success', data: 'Acceso a Áreas de Conservación de Costa Rica' });
});

app.get('/api/parks', (req, res) => {
  res.json({ status: 'success', message: 'Lista de Parques Nacionales' });
});

app.post('/api/reservations', (req, res) => {
  const { parque_id, nombre_visitante, email_visitante, telefono_visitante, cantidad_visitantes, fecha_visita } = req.body || {};

  if (!nombre_visitante || !email_visitante || !fecha_visita) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre, email, fecha_visita)' });
  }

  const codigo_reserva = generarCodigoReserva();
  const parque = parque_id || 'pn-cano-negro';
  const telefono = telefono_visitante || '';
  const cantidad = Number(cantidad_visitantes) || 1;
  const monto_total = cantidad * 800;
  const estado = 'Pendiente';
  const created_at = new Date().toISOString();

  try {
    const result = insertReservationStmt.run(
      codigo_reserva,
      parque,
      nombre_visitante,
      email_visitante,
      telefono,
      cantidad,
      fecha_visita,
      monto_total,
      estado,
      created_at
    );

    const newReservation = {
      id: Number(result.lastInsertRowid),
      codigo_reserva,
      parque_id: parque,
      nombre_visitante,
      email_visitante,
      telefono_visitante: telefono,
      cantidad_visitantes: cantidad,
      fecha_visita,
      monto_total,
      estado,
      created_at,
    };

    console.log('[API] Reservación registrada en SQLite:', newReservation.codigo_reserva);

    res.status(201).json({
      status: 'success',
      message: 'Reservación guardada correctamente',
      data: newReservation,
    });
  } catch (error) {
    console.error('[API] Error al guardar reservación en SQLite:', error);
    res.status(500).json({ error: 'Error al guardar la reservación en la base de datos' });
  }
});

app.get('/api/reservations', (req, res) => {
  try {
    const reservations = getAllReservationsStmt.all();
    res.json({
      status: 'success',
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    console.error('[API] Error al consultar reservaciones en SQLite:', error);
    res.status(500).json({ error: 'Error al consultar las reservaciones' });
  }
});

// Rutas de React: cualquier ruta que no sea /api devuelve index.html
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Servidor SINAC escuchando en el puerto ${PORT}`);
});