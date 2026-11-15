import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

export async function verificarConexion() {
  const resultado = await pool.query(
    'SELECT current_database() AS database_name'
  );

  console.log(
    '[DB] Conexion PostgreSQL verificada:',
    resultado.rows[0].database_name
  );
}
