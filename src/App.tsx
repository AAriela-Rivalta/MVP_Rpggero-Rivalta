import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold">Biblioteca</h1>

        {/* <nav className="mb-8 flex gap-4">
          <Link
            to="/"
            className="rounded-lg bg-slate-800 px-4 py-2 text-white"
          >
            Inicio
          </Link>

          <Link
            to="/cargar"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
          >
            Cargar Libro
          </Link>

          <Link
            to="/editar"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Editar Libro
          </Link>
        </nav> */}

        <Outlet />
      </div>
    </main>
  );
}
