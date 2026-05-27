const API_URL = "http://localhost:3000/api";

// =========================
// OBTENER LIBROS
// =========================

export async function getLibros() {
  const response = await fetch(`${API_URL}/libros`);

  return response.json();
}

// =========================
// EDITAR LIBRO
// =========================

type EditarLibroData = {
  nombre: string;
  descripcion: string;
  categoria: string;
};

export async function editarLibro(id: number, data: EditarLibroData) {
  const response = await fetch(`${API_URL}/libros/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return response.json();
}

// =========================
// PRESTAR LIBRO
// =========================

type PrestamoData = {
  libro_id: number;
  persona: string;
  fecha_prestamo: string;
  fecha_devolucion: string;
};

export async function prestarLibro(data: PrestamoData) {
  const response = await fetch(`${API_URL}/prestamos`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return response.json();
}

// =========================
// DEVOLVER LIBRO
// =========================

export async function devolverLibro(id: number) {
  const response = await fetch(`${API_URL}/devolver/${id}`, {
    method: "PUT",
  });

  return response.json();
}

export async function extenderLibroApi(
  libro_id: number,
  nueva_fecha_devolucion: string,
) {
  const response = await fetch("http://localhost:3000/api/prestamos/extender", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ libro_id, nueva_fecha_devolucion }),
  });
  return response.json();
}
