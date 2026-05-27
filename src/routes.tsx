import { createBrowserRouter } from "react-router-dom";

// import App from "./App";
import LibrosPage from "./pages/LibrosPage";
import CargarLibros from "./pages/CargarLibros";
import EditarLibros from "./pages/EditarLibros";
import Layout from "./components/layaout";
import DetalleLibro from "./pages/DetalleLibro";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LibrosPage />,
        children: [
          {
            path: "detalle/:id",
            element: <DetalleLibro />,
          },
        ],
      },
      {
        path: "cargar",
        element: <CargarLibros />,
      },
      {
        path: "editar/:id",
        element: <EditarLibros />,
      },
    ],
  },
]);
