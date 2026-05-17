import { useState } from "react";

export default function CargarLibros() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    cantidad: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/libros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cantidad: Number(formData.cantidad),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Libro cargado correctamente");

        setFormData({
          nombre: "",
          descripcion: "",
          categoria: "",
          cantidad: "",
        });
      } else {
        alert("Error al cargar libro");
      }
    } catch (error) {
      console.error(error);
      alert("Error del servidor");
    }
  }

  return (
    <div className="max-w-xl rounded-xl bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold">Cargar Libro</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del libro"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-500"
        >
          Guardar Libro
        </button>
      </form>
    </div>
  );
}