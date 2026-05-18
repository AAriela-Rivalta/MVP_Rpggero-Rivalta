import { pool } from "./db.js";

export async function findAllLibros() {
  const [rows] = await pool.query("SELECT * FROM libros");
  return rows;
}

export async function findLibroById(id) {
  const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
  return rows[0] || null;
}
