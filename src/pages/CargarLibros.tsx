import { useState } from "react";
// 🌟 1. IMPORTAMOS EL HOOK DE NAVEGACIÓN
import { useNavigate } from "react-router-dom";

export default function CargarLibros() {
  // 🌟 2. INICIALIZAMOS EL NAVIGATE
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
          disponibilidad: true, // Mandamos el booleano limpio que arregló el bug
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Libro cargado correctamente");

        setFormData({
          nombre: "",
          descripcion: "",
          categoria: "",
        });

        // 🌟 3. REDIRECCIÓN AUTOMÁTICA AL CATÁLOGO (Ruta Raíz "/")
        navigate("/");

        // Opcional: Si necesitás forzar la recarga para actualizar el catálogo
        window.location.reload();
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
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-500 transition cursor-pointer"
          >
            Guardar Libro
          </button>

          {/* 🌟 4. AGREGAMOS UN BOTÓN OPCIONAL DE CANCELAR PARA MEJORAR LA UX */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg bg-slate-800 px-5 py-3 text-white hover:bg-slate-700 transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
