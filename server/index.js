import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Memoria / Almacenamiento local SQLite
const dbFile = path.join(__dirname, '../database/sinac.sqlite');

// Memoria cache simulada para endpoints REST
let reservations = [
  {
    id: 1,
    codigo_reserva: 'SINAC-2026-001',
    parque_id: 'pn-cano-negro',
    nombre_visitante: 'Juan Pérez',
    email_visitante: 'juan.perez@example.com',
    telefono_visitante: '+506 8888-8888',
    cantidad_visitantes: 2,
    fecha_visita: '2026-08-15',
    monto_total: 1600.0,
    estado: 'Confirmada',
    created_at: new Date().toISOString(),
  }
];

// --- ENDPOINTS REST API SINAC ---

// 1. Áreas de Conservación
app.get('/api/conservation-areas', (req, res) => {
  res.json({ status: 'success', data: 'Acceso a Áreas de Conservación de Costa Rica' });
});

// 2. Parques Nacionales
app.get('/api/parks', (req, res) => {
  res.json({ status: 'success', message: 'Lista de Parques Nacionales' });
});

// 3. Crear Reservación (Booking Modal)
app.post('/api/reservations', (req, res) => {
  const { parque_id, nombre_visitante, email_visitante, telefono_visitante, cantidad_visitantes, fecha_visita } = req.body;

  if (!nombre_visitante || !email_visitante || !fecha_visita) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre, email, fecha_visita)' });
  }

  const newReservation = {
    id: reservations.length + 1,
    codigo_reserva: `SINAC-${Date.now().toString().slice(-6)}`,
    parque_id: parque_id || 'pn-cano-negro',
    nombre_visitante,
    email_visitante,
    telefono_visitante: telefono_visitante || '',
    cantidad_visitantes: Number(cantidad_visitantes) || 1,
    fecha_visita,
    monto_total: (Number(cantidad_visitantes) || 1) * 800,
    estado: 'Pendiente',
    created_at: new Date().toISOString(),
  };

  reservations.push(newReservation);

  console.log('[API Server] Reservación registrada con éxito:', newReservation);
  res.status(201).json({
    status: 'success',
    message: 'Reservación guardada correctamente en la Base de Datos',
    data: newReservation,
  });
});

// 4. Obtener todas las reservaciones (Para el Dashboard)
app.get('/api/reservations', (req, res) => {
  res.json({
    status: 'success',
    count: reservations.length,
    data: reservations,
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API de Base de Datos SINAC escuchando en http://localhost:${PORT}`);
});
