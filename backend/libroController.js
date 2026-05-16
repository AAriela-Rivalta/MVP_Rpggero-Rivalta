import { findAllLibros } from "./libroModel.js";

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
