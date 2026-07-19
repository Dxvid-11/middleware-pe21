import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", 
  database: "api_calificaciones_db",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function queryAsUser(
  userId: string,
  sql: string,
  params: any[] = []
) {
  const connection = await pool.getConnection();

  try {
    await connection.query(
      "SET @app_user_id = ?",
      [userId]
    );

    const [rows] = await connection.query(sql, params);

    return rows;

  } finally {
    connection.release();
  }
}