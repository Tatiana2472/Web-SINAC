import pg from 'pg';

const { Pool } = pg;

// Detectar si estamos utilizando Laravel Cloud o PostgreSQL local
const usaLaravelCloud = Boolean(process.env.DATABASE_URL);

// Configuracion de la conexion
const configuracion = usaLaravelCloud
  ? {
      // Laravel Cloud proporciona la conexion mediante DATABASE_URL
      connectionString: process.env.DATABASE_URL,

      // Conexion cifrada con verificacion del certificado
      ssl: {
        rejectUnauthorized: true,
      },
    }
  : {
      // Configuracion para PostgreSQL local
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    };

// Crear pool de conexiones PostgreSQL
export const pool = new Pool({
  ...configuracion,
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

// Verificar que la conexion funciona
export async function verificarConexion() {
  const resultado = await pool.query(
    'SELECT current_database() AS database_name'
  );

  console.log(
    '[DB] Conexion PostgreSQL verificada:',
    resultado.rows[0].database_name
  );
}
