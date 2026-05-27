import { Outlet } from "react-router-dom";
import Cards from "../components/cards";
import { useLibros } from "../hooks/useLibros";
import type { Libro } from "../types/libros.types";

export default function LibrosPage() {
  const { libros, loading, error } = useLibros();

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (libros.length === 0) {
    return <div>No se encontraron libros.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {libros.map((libro: Libro) => (
        <Cards key={libro.id} {...libro} />
      ))}
      <Outlet />
    </div>
  );
}
