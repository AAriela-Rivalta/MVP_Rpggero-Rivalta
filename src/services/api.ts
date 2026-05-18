export async function fetchLibros() {
  const response = await fetch("http://localhost:3000/api/libros");

  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de libros");
  }

  const body = await response.json();

  if (!body.success) {
    throw new Error(body.error || "Error desconocido al obtener libros");
  }

  return body.rows;
}

export async function fetchLibroById(id: string | number) {
  const response = await fetch(`http://localhost:3000/api/libros/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo cargar el libro");
  }

  const body = await response.json();

  if (!body.success) {
    throw new Error(body.error || "Error desconocido al obtener el libro");
  }

  return body.libro;
}
