import { pool } from "./db.js";

export async function findAllLibros() {
  const [rows] = await pool.query(`
    SELECT 
      l.id, 
      l.nombre, 
      l.descripcion, 
      l.categoria, 
      l.disponibilidad,
      p.persona,
      p.fecha_prestamo,
      p.fecha_devolucion
    FROM libros l
    LEFT JOIN prestamos p ON l.id = p.libro_id
  `);
  return rows;
}

export async function insertLibro(libro) {
  const { nombre, descripcion, categoria, disponibilidad } = libro;

  const [result] = await pool.query(
    `
    INSERT INTO libros
    (nombre, descripcion, categoria, disponibilidad)
    VALUES (?, ?, ?, ?)
    `,
    [nombre, descripcion, categoria, disponibilidad],
  );

  return result;
}

export async function editLibro(id, libro) {
  const libroActual = await findLibroById(id);

  const nombre = libro.nombre ?? libroActual.nombre;

  const descripcion = libro.descripcion ?? libroActual.descripcion;

  const categoria = libro.categoria ?? libroActual.categoria;

  const disponibilidad = libro.disponibilidad ?? libroActual.disponibilidad;

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
    [nombre, descripcion, categoria, disponibilidad, id],
  );

  return result;
}

export async function findLibroById(id) {
  const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
  return rows[0] || null;
}
