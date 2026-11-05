import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sitio compilado (carpeta dist/)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Reservaciones en memoria (pendiente: conectar a la base de datos)
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
  },
];

// --- ENDPOINTS REST API SINAC ---

app.get('/api/conservation-areas', (req, res) => {
  res.json({ status: 'success', data: 'Acceso a Áreas de Conservación de Costa Rica' });
});

app.get('/api/parks', (req, res) => {
  res.json({ status: 'success', message: 'Lista de Parques Nacionales' });
});

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
  console.log('[API] Reservación registrada:', newReservation.codigo_reserva);

  res.status(201).json({
    status: 'success',
    message: 'Reservación guardada correctamente',
    data: newReservation,
  });
});

app.get('/api/reservations', (req, res) => {
  res.json({
    status: 'success',
    count: reservations.length,
    data: reservations,
  });
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