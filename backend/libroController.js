import {
  findAllLibros,
  insertLibro,
  editLibro,
  findLibroById,
  deleteLibro,
} from "./libroModel.js";

export async function getLibros(req, res) {
  try {
    const rows = await findAllLibros();

    res.json({
      success: true,
      rows,
    });
  } catch (error) {
    console.error("MySQL error:", error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function createLibro(req, res) {
  try {
    const result = await insertLibro(req.body);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function updateLibro(req, res) {
  try {
    const result = await editLibro(req.params.id, req.body);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
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

export async function removeLibro(req, res) {
  try {
    const { id } = req.params;

    // 1. Buscamos el libro para verificar su estado actual
    const libro = await findLibroById(id);

    if (!libro) {
      return res
        .status(404)
        .json({ success: false, error: "El libro no existe" });
    }

    // 2. REGLA DE NEGOCIO: Validar disponibilidad (1 = Disponible, 0 = Prestado)
    if (libro.disponibilidad === 0 || libro.disponibilidad === false) {
      return res.status(400).json({
        success: false,
        error: "No se puede eliminar el libro porque está prestado actualmente",
      });
    }

    // 3. Si pasó la regla, procedemos al borrado
    await deleteLibro(id);

    res.json({
      success: true,
      message: "Libro eliminado correctamente de la biblioteca",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
