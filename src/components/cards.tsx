type CardProps = {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  disponibilidad: boolean;
};

export default function Cards({
  id,
  nombre,
  descripcion,
  categoria,
  disponibilidad,
}: CardProps) {
  function verDetalle() {
    alert(`
Libro: ${nombre}

Descripción:
${descripcion}

Categoría:
${categoria}
  `);
  }

  function solicitarPrestamo() {
    const persona = prompt("Nombre de la persona:");

    if (!persona) return;

    const fechaPrestamo = new Date().toLocaleDateString();

    const fechaDevolucion = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString();

    alert(`
Préstamo registrado

Libro: ${nombre}

Persona:
${persona}

Fecha préstamo:
${fechaPrestamo}

Fecha devolución:
${fechaDevolucion}
  `);
  }

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-md transition hover:shadow-lg">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-slate-800">{nombre}</h2>

        <p className="mb-4 text-slate-600">
          {descripcion || "No hay descripción disponible"}
        </p>

        <div className="space-y-1 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Categoría:</span> {categoria}
          </p>

          <p>
            <span className="font-semibold">Estado:</span>{" "}
            {disponibilidad ? (
              <span className="text-green-600 font-semibold">Disponible</span>
            ) : (
              <span className="text-red-600 font-semibold">No disponible</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={verDetalle}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          Ver detalle
        </button>

        <button
          onClick={solicitarPrestamo}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
        >
          Solicitar
        </button>

        <button
          onClick={() => (window.location.href = `/editar/${id}`)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
        >
          Editar
        </button>
      </div>
    </article>
  );
}
