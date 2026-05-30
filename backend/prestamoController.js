import { pool } from "./db.js";
import {
  insertPrestamo,
  devolverPrestamo,
  actualizarFechaPrestamo,
} from "./prestamoModel.js";
import {
  ExtensionContext,
  ExtensionEstandarStrategy,
  ExtensionAcademicaStrategy,
} from "./extensionStrategy.js";

export async function createPrestamo(req, res) {
  try {
    const { libro_id, persona, fecha_prestamo, fecha_devolucion } = req.body;

    // 1. Insertamos el registro en la tabla prestamos
    await insertPrestamo({
      libro_id,
      persona,
      fecha_prestamo,
      fecha_devolucion,
    });

    // 2. Cambiamos la disponibilidad del libro a 0 (No disponible / Prestado)
    await pool.query(
      `
      UPDATE libros
      SET disponibilidad = 0
      WHERE id = ?
      `,
      [libro_id], // <- Corregido: antes decía [id] y fallaba
    );

    res.json({
      success: true,
      message: "Préstamo registrado correctamente",
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
    const { id } = req.params; // Este es el ID del libro que se devuelve

    // 1. Eliminamos el registro de la tabla prestamos
    await devolverPrestamo(id);

    // 2. Restauramos la disponibilidad del libro a 1 (Disponible)
    await pool.query(
      `
      UPDATE libros
      SET disponibilidad = 1
      WHERE id = ?
      `,
      [id], // <- Corregido: antes decía [libro_id] y rompía el servidor
    );

    res.json({
      success: true,
      message: "Libro devuelto correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function extenderPrestamo(req, res) {
  try {
    const { libro_id, fecha_actual, tipo_extension } = req.body;

    // Seleccionamos la estrategia dinámicamente
    let estrategia = ExtensionEstandarStrategy;
    if (tipo_extension === "academica") {
      estrategia = ExtensionAcademicaStrategy;
    }

    const context = new ExtensionContext(estrategia);
    const nueva_fecha_devolucion = context.ejecutarEstrategia(
      fecha_actual || new Date(),
    );

    await actualizarFechaPrestamo(libro_id, nueva_fecha_devolucion);

    res.json({
      success: true,
      message: `Plazo extendido correctamente usando estrategia: ${tipo_extension || "estandar"}`,
      nuevaFecha: nueva_fecha_devolucion,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
