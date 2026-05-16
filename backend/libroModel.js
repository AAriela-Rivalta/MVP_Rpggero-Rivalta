import { pool } from "./db.js";

export async function findAllLibros() {
  const [rows] = await pool.query("SELECT * FROM libros");
  return rows;
}
