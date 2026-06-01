import { useState } from "react";
// 🌟 Agregamos extenderLibroApi a tus importaciones de la API
import {
  prestarLibro,
  devolverLibro,
  extenderLibroApi,
  eliminarLibroApi,
} from "../api";
import { Link } from "react-router-dom";

type CardProps = {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  disponibilidad: boolean | number;
  persona?: string;
  fecha_devolucion?: string;
};

export default function Cards({
  id,
  nombre,
  descripcion,
  categoria,
  disponibilidad,
  persona,
  fecha_devolucion,
}: CardProps) {
  const [showPrestamo, setShowPrestamo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [nombrePrestamo, setNombrePrestamo] = useState("");

  const [tipoExtension, setTipoExtension] = useState<"estandar" | "academica">(
    "estandar",
  );

  const isDisponible = disponibilidad === true || disponibilidad === 1;

  // Lógica de fechas base para el modal de préstamo nuevo
  const hoy = new Date();
  const fechaPrestamo = hoy.toISOString().split("T")[0];
  const unaSemanaDespues = new Date();
  unaSemanaDespues.setDate(hoy.getDate() + 7);
  const fechaDevolucionBase = unaSemanaDespues.toISOString().split("T")[0];

  // ==========================================
  // 🌟 FUNCIÓN PARA EXTENDER PRÉSTAMO 1 SEMANA
  // ==========================================
  async function extenderPrestamoHandler() {
    try {
      // Usamos la fecha que ya viene de la base de datos (o la de hoy si no existiera)
      const fechaBase = fecha_devolucion
        ? fecha_devolucion.split("T")[0]
        : fechaDevolucionBase;

      // Invocamos a la API pasándole el tipo de extensión (el backend calcula el resto)
      const data = await extenderLibroApi(id, fechaBase, tipoExtension);

      if (data.success) {
        setMensaje(`Préstamo extendido con éxito hasta el ${data.nuevaFecha}`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMensaje("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al extender el préstamo");
    }
  }

  async function confirmarPrestamo() {
    if (!nombrePrestamo.trim()) {
      setMensaje("Debe ingresar un nombre");
      return;
    }

    try {
      await prestarLibro({
        libro_id: id,
        persona: nombrePrestamo,
        fecha_prestamo: fechaPrestamo,
        fecha_devolucion: fechaDevolucionBase,
      });

      setMensaje(`Libro prestado correctamente a ${nombrePrestamo}`);
      setShowPrestamo(false);
      setNombrePrestamo("");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setMensaje("Error al registrar préstamo");
    }
  }

  async function devolverLibroHandler() {
    try {
      await devolverLibro(id);
      setMensaje("Libro devuelto correctamente");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setMensaje("Error al devolver libro");
    }
  }

  return (
    <>
      {/* MENSAJE FLOTANTE */}
      {mensaje && (
        <div className="fixed right-5 top-5 z-50 rounded-lg bg-emerald-600 px-5 py-3 text-white shadow-lg">
          {mensaje}
        </div>
      )}

      {/* CARD */}
      <article className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-md transition hover:shadow-lg">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-slate-800">{nombre}</h2>
          <p className="mb-4 text-slate-600">{descripcion}</p>

          <div className="space-y-1 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Categoría:</span> {categoria}
            </p>

            <p>
              <span className="font-semibold">Estado:</span>{" "}
              {isDisponible ? (
                <span className="font-semibold text-green-600">Disponible</span>
              ) : (
                <span className="font-semibold text-red-600">
                  No disponible
                </span>
              )}
            </p>

            {!isDisponible && (
              <>
                <p>
                  <span className="font-semibold">Prestado a:</span>{" "}
                  {persona || "Usuario"}
                </p>
                <p>
                  <span className="font-semibold">Fecha devolución:</span>{" "}
                  {fecha_devolucion
                    ? fecha_devolucion.split("T")[0]
                    : fechaDevolucionBase}
                </p>
              </>
            )}
          </div>
        </div>

        {/* CONTENEDOR DE BOTONES */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/detalle/${id}`}
            className="rounded-lg bg-[#5c493c] px-4 py-2 text-white transition hover:bg-[#493a30]"
          >
            Ver detalle
          </Link>

          {isDisponible ? (
            <button
              onClick={() => setShowPrestamo(true)}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
            >
              Prestar
            </button>
          ) : (
            <button
              onClick={devolverLibroHandler}
              className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-400"
            >
              Devolver
            </button>
          )}

          <Link
            to={`/editar/${id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500 text-center"
          >
            Editar
          </Link>

          {/* BOTÓN EXTENDER */}
          {!isDisponible && (
            <div className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-1">
              <select
                value={tipoExtension}
                onChange={(e) =>
                  setTipoExtension(e.target.value as "estandar" | "academica")
                }
                className="rounded bg-white p-1 text-sm font-medium text-purple-800 border border-purple-300 focus:outline-none cursor-pointer"
              >
                <option value="estandar">Normal (+7 días)</option>
                <option value="academica">Académica (+14 días)</option>
              </select>

              <button
                onClick={extenderPrestamoHandler}
                className="rounded-lg bg-purple-600 px-3 py-1.5 text-sm text-white transition hover:bg-purple-500 font-semibold"
              >
                Extender prestamo
              </button>
            </div>
          )}

          {isDisponible && (
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    `¿Estás seguro de que querés eliminar "${nombre}"?`,
                  )
                ) {
                  try {
                    const data = await eliminarLibroApi(id);
                    if (data.success) {
                      setMensaje("Libro eliminado con éxito");
                      setTimeout(() => window.location.reload(), 1000);
                    } else {
                      alert(data.error);
                    }
                  } catch {
                    alert("Error al intentar eliminar el libro");
                  }
                }
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-500 text-center"
            >
              Eliminar
            </button>
          )}
        </div>
      </article>

      {/* MODAL SOLICITAR PRESTAMO */}
      {showPrestamo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold">Solicitar préstamo</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-semibold">
                  Nombre de la persona
                </label>
                <input
                  type="text"
                  placeholder="Ingrese nombre"
                  value={nombrePrestamo}
                  onChange={(e) => setNombrePrestamo(e.target.value)}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="rounded-lg bg-slate-100 p-4">
                <p>
                  <span className="font-semibold">Fecha préstamo:</span>{" "}
                  {fechaPrestamo}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Fecha devolución:</span>{" "}
                  {fechaDevolucionBase}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={confirmarPrestamo}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowPrestamo(false)}
                className="rounded-lg bg-slate-800 px-4 py-2 text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
