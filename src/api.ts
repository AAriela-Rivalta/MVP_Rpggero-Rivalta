const API_URL = "http://localhost:3000/api/libros";

export async function fetchLibros() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener libros");
  }

  const data = await response.json();

  return data.rows;
}