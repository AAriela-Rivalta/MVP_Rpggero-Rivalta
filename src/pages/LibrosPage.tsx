import Cards from "../components/cards";
import { useLibros } from "../hooks/useLibros";

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
      {libros.map((libro: any) => (
        <Cards
          key={libro.id}
          id={libro.id}
          nombre={libro.nombre}
          descripcion={libro.descripcion}
          categoria={libro.categoria}
          cantidad={libro.cantidad}
        />
      ))}
    </div>
  );
}
