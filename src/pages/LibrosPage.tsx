import { useState } from "react";
import { Outlet } from "react-router-dom";
import Cards from "../components/cards";
import { useLibros } from "../hooks/useLibros";
import type { Libro } from "../types/libros.types";

export default function LibrosPage() {
  const { libros, loading, error } = useLibros();

  const [busqueda, setBusqueda] = useState("");

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }
  const librosFiltrados = libros.filter(
    (libro: Libro) =>
      libro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.descripcion.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-3"
        />
      </div>

      {librosFiltrados.length === 0 ? (
        <div>No se encontraron libros.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {librosFiltrados.map((libro: Libro) => (
            <Cards key={libro.id} {...libro} />
          ))}
        </div>
      )}

      <Outlet />
    </>
  );
}
