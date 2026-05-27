import { pool } from "./db.js";

// Deja la inserción limpia y normal para préstamos nuevos
export async function insertPrestamo(prestamo) {
  const { libro_id, persona, fecha_prestamo, fecha_devolucion } = prestamo;

  const [result] = await pool.query(
    `
    INSERT INTO prestamos 
      (libro_id, persona, fecha_prestamo, fecha_devolucion)
    VALUES (?, ?, ?, ?)
    `,
    [libro_id, persona, fecha_prestamo, fecha_devolucion],
  );

  return result;
}

export async function actualizarFechaPrestamo(
  libro_id,
  nueva_fecha_devolucion,
) {
  const [result] = await pool.query(
    `
    UPDATE prestamos
    SET fecha_devolucion = ?
    WHERE libro_id = ?
    `,
    [nueva_fecha_devolucion, libro_id],
  );
  return result;
}

export async function devolverPrestamo(libroId) {
  const [result] = await pool.query(
    `
    DELETE FROM prestamos
    WHERE libro_id = ?
    `,
    [libroId],
  );

  return result;
}
