-- Script de creación de tablas para la Base de Datos del SINAC (SQLite / PostgreSQL)

-- 1. Áreas de Conservación
CREATE TABLE IF NOT EXISTS areas_conservacion (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    abreviatura TEXT NOT NULL,
    nombre_es TEXT NOT NULL,
    nombre_en TEXT NOT NULL,
    descripcion_es TEXT,
    descripcion_en TEXT,
    headquarters TEXT,
    direccion TEXT,
    telefono TEXT,
    email TEXT,
    map_url TEXT,
    hero_image TEXT,
    hectareas TEXT,
    parques_count INTEGER DEFAULT 0,
    visitantes_anuales TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Parques Nacionales y Áreas Protegidas
CREATE TABLE IF NOT EXISTS parques_nacionales (
    id TEXT PRIMARY KEY,
    area_conservacion_id TEXT REFERENCES areas_conservacion(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    nombre_es TEXT NOT NULL,
    nombre_en TEXT NOT NULL,
    descripcion_es TEXT,
    descripcion_en TEXT,
    imagen_url TEXT,
    tarifa_nacional REAL DEFAULT 1000.0,
    tarifa_extranjero REAL DEFAULT 15.0,
    horario TEXT DEFAULT '8:00 AM - 4:00 PM',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Servicios
CREATE TABLE IF NOT EXISTS servicios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_es TEXT NOT NULL UNIQUE,
    nombre_en TEXT NOT NULL UNIQUE,
    icono TEXT
);

-- 4. Atractivos Turísticos
CREATE TABLE IF NOT EXISTS atractivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_es TEXT NOT NULL UNIQUE,
    nombre_en TEXT NOT NULL UNIQUE,
    icono TEXT
);

-- Tablas intermedias N:M
CREATE TABLE IF NOT EXISTS parque_servicios (
    parque_id TEXT REFERENCES parques_nacionales(id) ON DELETE CASCADE,
    servicio_id INTEGER REFERENCES servicios(id) ON DELETE CASCADE,
    PRIMARY KEY (parque_id, servicio_id)
);

CREATE TABLE IF NOT EXISTS parque_atractivos (
    parque_id TEXT REFERENCES parques_nacionales(id) ON DELETE CASCADE,
    atractivo_id INTEGER REFERENCES atractivos(id) ON DELETE CASCADE,
    PRIMARY KEY (parque_id, atractivo_id)
);

-- 5. Reservaciones realizadas por los usuarios
CREATE TABLE IF NOT EXISTS reservaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_reserva TEXT UNIQUE NOT NULL,
    parque_id TEXT REFERENCES parques_nacionales(id),
    nombre_visitante TEXT NOT NULL,
    email_visitante TEXT NOT NULL,
    telefono_visitante TEXT,
    cantidad_visitantes INTEGER NOT NULL DEFAULT 1,
    fecha_visita TEXT NOT NULL,
    monto_total REAL DEFAULT 0.0,
    estado TEXT DEFAULT 'Pendiente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Usuarios Administradores (Dashboard SINAC)
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rol TEXT DEFAULT 'Administrador',
    area_conservacion_id TEXT REFERENCES areas_conservacion(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Noticias y Comunicados
CREATE TABLE IF NOT EXISTS noticias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo_es TEXT NOT NULL,
    titulo_en TEXT NOT NULL,
    resumen_es TEXT,
    resumen_en TEXT,
    contenido_es TEXT,
    contenido_en TEXT,
    imagen_url TEXT,
    fecha_publicacion TEXT DEFAULT CURRENT_DATE,
    categoria TEXT DEFAULT 'General'
);
