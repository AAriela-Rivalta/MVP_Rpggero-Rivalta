import { useParams, useNavigate } from "react-router-dom";
import { useLibros } from "../hooks/useLibros";
import type { Libro } from "../types/libros.types";

export default function DetalleLibro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { libros } = useLibros();

  const libro = libros?.find((l: Libro) => l.id === Number(id)) as
    | Libro
    | undefined;

  if (!libro) {
    return (
      <div className="fixed inset-0 z-45 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-xl">
          <p className="text-red-500 font-bold">
            El libro no existe o fue eliminado.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-white"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="absolute inset-0" onClick={() => navigate("/")} />

      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-xl border border-slate-100 z-10">
        <h2 className="mb-4 text-3xl font-bold text-slate-800">
          {libro.nombre}
        </h2>
        <p className="mb-4 text-slate-700">{libro.descripcion}</p>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Categoría:</span> {libro.categoria}
          </p>
          <p>
            <span className="font-semibold">Estado:</span>{" "}
            {libro.disponibilidad ? (
              <span className="text-green-600 font-semibold">Disponible</span>
            ) : (
              <span className="text-red-600 font-semibold">No disponible</span>
            )}
          </p>
        </div>

        <div className="mt-5 rounded-lg bg-slate-100 p-4">
          <p className="font-semibold">Referencia del libro</p>
          <p className="mt-2 text-sm text-slate-600">
            Este libro forma parte del catálogo oficial de la biblioteca y puede
            solicitarse para préstamos académicos.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 transition"
        >
          Cerrar Detalle
        </button>
      </div>
    </div>
  );
}
