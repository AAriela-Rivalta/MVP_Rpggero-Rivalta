import { pool } from "./db.js";
import {
  insertPrestamo,
  devolverPrestamo,
} from "./prestamoModel.js";

import { editLibro } from "./libroModel.js";

export async function createPrestamo(req, res) {
  try {
    const {
      libro_id,
      persona,
      fecha_prestamo,
      fecha_devolucion,
    } = req.body;

    await insertPrestamo({
      libro_id,
      persona,
      fecha_prestamo,
      fecha_devolucion,
    });

    // libro no disponible
    
    await pool.query(
  `
  UPDATE libros
  SET disponibilidad = 1
  WHERE id = ?
  `,
  [id]
);

    res.json({
      success: true,
      message: "Préstamo registrado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function returnLibro(req, res) {
  try {
    const { id } = req.params;

    await devolverPrestamo(id);

    await pool.query(
  `
  UPDATE libros
  SET disponibilidad = 0
  WHERE id = ?
  `,
  [libro_id]
);

    res.json({
      success: true,
      message: "Libro devuelto",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}