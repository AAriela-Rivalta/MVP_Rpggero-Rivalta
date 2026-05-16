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
    <div className="space-y-4">
      {libros.map((libro: any) => (
        <article
          key={libro.id || libro.ID || libro.titulo}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <h2 className="text-xl font-semibold">
            {libro.titulo || libro.nombre || "Sin título"}
          </h2>
          <p className="text-slate-600">
            Descripcion:{" "}
            {libro.descripcion ||
              libro.descripcion ||
              "No hay descripcion disponible"}
          </p>
          {libro.categoria ? (
            <p className="mt-2">Categoría: {libro.categoria}</p>
          ) : null}

          {libro.cantidad ? (
            <p className="mt-2">Cantidad: {libro.cantidad}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
