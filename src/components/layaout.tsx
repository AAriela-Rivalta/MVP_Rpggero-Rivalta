import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="p-4 bg-[#eee9e1] flex justify-between items-center">
        <Link to="/" className="text-3xl text-[#5c493c] font-bold italic">
          Biblioteca
        </Link>

        <div className="py-4">
          <Link
            to="/cargar"
            className="bg-[#5c493c] text-[#eee9e1] hover:bg-[#8b7355] py-2 px-4 rounded"
          >
            Cargar Libro
          </Link>
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}
