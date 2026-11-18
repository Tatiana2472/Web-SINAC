import pg from 'pg';

const { Pool } = pg;

// Obtener la configuracion de PostgreSQL
function obtenerConfiguracion() {
  const databaseUrl = process.env.DATABASE_URL;

  // Conexion a PostgreSQL en Laravel Cloud
  if (databaseUrl) {
    const url = new URL(databaseUrl);

    if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
      throw new Error('Protocolo PostgreSQL no valido');
    }

    const hostname = url.hostname;

    return {
      host: hostname,
      port: Number(url.port || 5432),
      database: decodeURIComponent(url.pathname.slice(1)),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),

      // Conexion TLS con verificacion del certificado
      ssl: {
        rejectUnauthorized: true,
        servername: hostname,
      },
    };
  }

  // Conexion PostgreSQL local
  return {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };
}

// Crear el pool de conexiones
export const pool = new Pool({
  ...obtenerConfiguracion(),
  max: 5,
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 30000,
});

// Verificar conexion con la base de datos
export async function verificarConexion() {
  const resultado = await pool.query(
    'SELECT current_database() AS database_name'
  );

  console.log(
    '[DB] Conexion PostgreSQL verificada:',
    resultado.rows[0].database_name
  );
}
