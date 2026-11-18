import pg from 'pg';

const { Pool } = pg;

// Obtener la configuracion de PostgreSQL
function obtenerConfiguracion() {
  const databaseUrl = process.env.DATABASE_URL;

  // Conexion PostgreSQL de Laravel Cloud
  if (databaseUrl) {
    const url = new URL(databaseUrl);

    if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
      throw new Error('Protocolo PostgreSQL no valido');
    }

    const hostnameLaravel = url.hostname;

    // Dominio proporcionado por Laravel Cloud
    const sufijoLaravel =
      '.c-3.aws-us-east-1.pg.laravel.cloud';

    // Dominio compatible con el certificado TLS observado
    const sufijoNeon =
      '.c-3.us-east-1.aws.neon.tech';

    // Ajustar el hostname solamente para el endpoint identificado
    const hostname = hostnameLaravel.endsWith(sufijoLaravel)
      ? hostnameLaravel.slice(0, -sufijoLaravel.length) + sufijoNeon
      : hostnameLaravel;

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
  try {
    const resultado = await pool.query(
      'SELECT current_database() AS database_name'
    );

    console.log(
      '[DB] Conexion PostgreSQL verificada:',
      resultado.rows[0].database_name
    );
  } catch (error) {
    // Diagnostico sin mostrar contrasenas ni DATABASE_URL
    console.error('[DB] Diagnostico de conexion:', {
      codigo: error.code || 'No disponible',
      nombreEsperado: error.host || 'No disponible',
      nombresCertificado:
        error.cert?.subjectaltname || 'No disponible',
    });

    throw error;
  }
}