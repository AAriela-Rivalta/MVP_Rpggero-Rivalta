import { findAllLibros, findLibroById } from "./libroModel.js";

export async function getLibros(req, res) {
  try {
    const rows = await findAllLibros();
    res.json({ success: true, rows });
  } catch (error) {
    console.error("MySQL error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function getLibroById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Falta el id del libro" });
    }

    const libro = await findLibroById(id);

    if (!libro) {
      return res
        .status(404)
        .json({ success: false, error: "Libro no encontrado" });
    }

    res.json({ success: true, libro });
  } catch (error) {
    console.error("MySQL error:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
