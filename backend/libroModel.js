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
    cantidad,
  } = libro;

  const [result] = await pool.query(
    `
    INSERT INTO libros
    (nombre, descripcion, categoria, cantidad)
    VALUES (?, ?, ?, ?)
    `,
    [nombre, descripcion, categoria, cantidad]
  );

  return result;
}

export async function editLibro(id, libro) {
  const {
    nombre,
    descripcion,
    categoria,
    cantidad,
  } = libro;

  const [result] = await pool.query(
    `
    UPDATE libros
    SET
      nombre = ?,
      descripcion = ?,
      categoria = ?,
      cantidad = ?
    WHERE id = ?
    `,
    [nombre, descripcion, categoria, cantidad, id]
  );

  return result;
}

