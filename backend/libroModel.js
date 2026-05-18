import { pool } from "./db.js";

export async function findAllLibros() {
  const [rows] = await pool.query("SELECT * FROM libros");
  return rows;
}


export async function insertLibro(libro) {
  const {
    nombre,
    descripcion,
    categoria,
    disponibilidad,
  } = libro;

  const [result] = await pool.query(
    `
    INSERT INTO libros
    (nombre, descripcion, categoria, disponibilidad)
    VALUES (?, ?, ?, ?)
    `,
    [nombre, descripcion, categoria, disponibilidad]
  );

  return result;
}

export async function editLibro(id, libro) {
  const {
    nombre,
    descripcion,
    categoria,
    disponibilidad,
  } = libro;

  const [result] = await pool.query(
    `
    UPDATE libros
    SET
      nombre = ?,
      descripcion = ?,
      categoria = ?,
      disponibilidad = ?
    WHERE id = ?
    `,
    [nombre, descripcion, categoria, disponibilidad, id]
  );

  return result;
}

export async function findLibroById(id) {
  const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
  return rows[0] || null;
}
