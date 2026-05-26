import { pool } from "./db.js";

export async function insertPrestamo(prestamo) {
  const {
    libro_id,
    persona,
    fecha_prestamo,
    fecha_devolucion,
  } = prestamo;

  const [result] = await pool.query(
    `
    INSERT INTO prestamos
    (
      libro_id,
      persona,
      fecha_prestamo,
      fecha_devolucion
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      libro_id,
      persona,
      fecha_prestamo,
      fecha_devolucion,
    ]
  );

  return result;
}

export async function devolverPrestamo(libroId) {
  const [result] = await pool.query(
    `
    DELETE FROM prestamos
    WHERE libro_id = ?
    `,
    [libroId]
  );

  return result;
}