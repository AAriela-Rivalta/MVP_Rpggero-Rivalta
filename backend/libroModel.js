import { pool } from "./db.js";
//todas las funciones pueden ejecutar consultas SQL utilizando
//await pool.query(...)

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
  //Extrae los datos recibidos desde el controlador
  const { nombre, descripcion, categoria, disponibilidad } = libro;

  // REG REGLA DE NEGOCIO: Si no viene, es true (1) por defecto
  const disponibilidadReal = (disponibilidad ?? true) ? 1 : 0;

  const [result] = await pool.query(
    `
    INSERT INTO libros
    (nombre, descripcion, categoria, disponibilidad)
    VALUES (?, ?, ?, ?)
    `,
    [nombre, descripcion, categoria, disponibilidadReal],
  );

  return result;
}

export async function editLibro(id, libro) {
  const libroActual = await findLibroById(id);

  const nombre = libro.nombre ?? libroActual.nombre;
  const descripcion = libro.descripcion ?? libroActual.descripcion;
  const categoria = libro.categoria ?? libroActual.categoria;

  let disponibilidadReal = libroActual.disponibilidad;
  if (libro.disponibilidad !== undefined) {
    disponibilidadReal = libro.disponibilidad ? 1 : 0;
  }

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
    [nombre, descripcion, categoria, disponibilidadReal, id],
  );

  return result;
}

export async function findLibroById(id) {
  const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
  return rows[0] || null;
}

export async function deleteLibro(id) {
  const [result] = await pool.query("DELETE FROM libros WHERE id = ?", [id]);
  return result;
}
