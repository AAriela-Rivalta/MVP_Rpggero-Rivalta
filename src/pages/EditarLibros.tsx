import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLibros } from "../hooks/useLibros";
import { editarLibro } from "../api";
import type { Libro } from "../types/libros.types";

export default function EditarLibros() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { libros } = useLibros();

  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editCategoria, setEditCategoria] = useState("");

  // 🌟 Estado para controlar el texto y el color del toast
  const [toast, setToast] = useState<{
    mensaje: string;
    tipo: "exito" | "error";
  } | null>(null);

  useEffect(() => {
    if (libros && libros.length > 0) {
      const libroActual = libros?.find((l: Libro) => l.id === Number(id)) as
        | Libro
        | undefined;

      if (libroActual) {
        setTimeout(() => {
          setEditNombre(libroActual.nombre);
          setEditDescripcion(libroActual.descripcion);
          setEditCategoria(libroActual.categoria);
        }, 0);
      }
    }
  }, [id, libros]);

  async function guardarEdicion(e: React.FormEvent) {
    e.preventDefault();
    try {
      await editarLibro(Number(id), {
        nombre: editNombre,
        descripcion: editDescripcion,
        categoria: editCategoria,
      });

      // 🌟 Toast verde de éxito
      setToast({ mensaje: "Libro actualizado correctamente", tipo: "exito" });

      // Esperamos 1.5 segundos para que se lea y refrescamos
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);

      // 🌟 Toast rojo de error
      setToast({ mensaje: "Error, no se pudo editar el libro", tipo: "error" });

      // Opcional: Desvanecer el cartel de error después de 3 segundos sin cerrar el modal
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  }

  return (
    <>
      {/* 🌟 RENDERIZADO DINÁMICO DEL TOAST */}
      {toast && (
        <div
          className={`fixed right-5 top-5 z-50 rounded-lg px-5 py-3 text-white shadow-lg transition-all duration-300 ${
            toast.tipo === "exito" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.mensaje}
        </div>
      )}

      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
        <div className="absolute inset-0" onClick={() => navigate("/")} />

        <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-xl border border-slate-100 z-10">
          <h2 className="mb-5 text-2xl font-bold">Editar libro</h2>

          <form onSubmit={guardarEdicion} className="space-y-4">
            <div>
              <label className="mb-1 block font-semibold">Título</label>
              <input
                type="text"
                value={editNombre}
                onChange={(e) => setEditNombre(e.target.value)}
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Descripción</label>
              <textarea
                value={editDescripcion}
                onChange={(e) => setEditDescripcion(e.target.value)}
                className="w-full rounded-lg border p-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Categoría</label>
              <input
                type="text"
                value={editCategoria}
                onChange={(e) => setEditCategoria(e.target.value)}
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-500 transition"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-lg bg-slate-800 px-4 py-2 text-white font-medium hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
