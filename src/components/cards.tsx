import { useState } from "react";

import { prestarLibro, devolverLibro, editarLibro } from "../api";
import { Link } from "react-router-dom";

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
  // =========================
  // MODALES
  // =========================

  const [showPrestamo, setShowPrestamo] = useState(false);

  // =========================
  // MENSAJES
  // =========================

  const [mensaje, setMensaje] = useState("");

  // =========================
  // DATOS REALES DEL LIBRO
  // =========================

  const [libroNombre, setLibroNombre] = useState(nombre);

  const [libroDescripcion, setLibroDescripcion] = useState(descripcion);

  const [libroCategoria, setLibroCategoria] = useState(categoria);

  // =========================
  // DATOS TEMPORALES EDITAR
  // =========================

  // =========================
  // PRESTAMO
  // =========================

  const [persona, setPersona] = useState("");

  const hoy = new Date();

  const fechaPrestamo = hoy.toISOString().split("T")[0];

  const fechaDevolucion = "2026-06-01";

  // =========================
  // DISPONIBILIDAD
  // =========================

  const [prestado, setPrestado] = useState(!disponibilidad);

  const [prestadoA, setPrestadoA] = useState("");

  const [fechaDevActual, setFechaDevActual] = useState("");

  // =========================
  // FUNCIONES
  // =========================

  async function confirmarPrestamo() {
    if (!persona.trim()) {
      setMensaje("Debe ingresar un nombre");
      return;
    }

    try {
      await prestarLibro({
        libro_id: id,
        persona,
        fecha_prestamo: fechaPrestamo,
        fecha_devolucion: fechaDevolucion,
      });
      setPrestado(true);

      setPrestadoA(persona);

      setFechaDevActual(fechaDevolucion);

      setMensaje(`Libro prestado correctamente a ${persona}`);

      setShowPrestamo(false);

      setPersona("");

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

      setPrestado(false);

      setPrestadoA("");

      setFechaDevActual("");

      setMensaje("Libro devuelto correctamente");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setMensaje("Error al devolver libro");
    }
  }

  function extenderPrestamo() {
    const nuevaFecha =
      prompt("Ingrese nueva fecha de devolución (YYYY-MM-DD)") ||
      fechaDevActual;

    setFechaDevActual(nuevaFecha);

    setMensaje(`Préstamo extendido hasta ${nuevaFecha}`);

    setTimeout(() => {
      setMensaje("");
    }, 3000);
  }

  // =========================
  // COMPONENTE
  // =========================

  return (
    <>
      {/* MENSAJE */}

      {mensaje && (
        <div className="fixed right-5 top-5 z-50 rounded-lg bg-emerald-600 px-5 py-3 text-white shadow-lg">
          {mensaje}
        </div>
      )}

      {/* CARD */}

      <article className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-md transition hover:shadow-lg">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-slate-800">
            {libroNombre}
          </h2>

          <p className="mb-4 text-slate-600">{libroDescripcion}</p>

          <div className="space-y-1 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Categoría:</span> {libroCategoria}
            </p>

            <p>
              <span className="font-semibold">Estado:</span>{" "}
              {prestado ? (
                <span className="font-semibold text-red-600">
                  No disponible
                </span>
              ) : (
                <span className="font-semibold text-green-600">Disponible</span>
              )}
            </p>

            {prestado && (
              <>
                <p>
                  <span className="font-semibold">Prestado a:</span>{" "}
                  {prestadoA || "Usuario"}
                </p>

                <p>
                  <span className="font-semibold">Fecha devolución:</span>{" "}
                  {fechaDevActual || fechaDevolucion}
                </p>
              </>
            )}
          </div>
        </div>

        {/* BOTONES */}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/detalle/${id}`}
            className="rounded-lg bg-[#5c493c] px-4 py-2 text-white transition hover:bg-[#493a30]"
          >
            Ver detalle
          </Link>

          <button
            disabled={prestado}
            onClick={() => setShowPrestamo(true)}
            className={`rounded-lg px-4 py-2 text-white transition ${
              prestado
                ? "cursor-not-allowed bg-gray-400"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            Solicitar
          </button>

          <Link
            to={`/editar/${id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500 text-center"
          >
            Editar
          </Link>

          {prestado && (
            <>
              <button
                onClick={devolverLibroHandler}
                className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-400"
              >
                Devolver
              </button>

              <button
                onClick={extenderPrestamo}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-500"
              >
                Extender
              </button>
            </>
          )}
        </div>
      </article>

      {/* ========================= */}
      {/* MODAL PRESTAMO */}
      {/* ========================= */}

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
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
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
                  {fechaDevolucion}
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
