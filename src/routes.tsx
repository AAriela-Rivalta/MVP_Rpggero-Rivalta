import { createBrowserRouter } from "react-router-dom";

// import App from "./App";
import LibrosPage from "./pages/LibrosPage";
import CargarLibros from "./pages/CargarLibros";
import EditarLibros from "./pages/EditarLibros";
import Layout from "./components/layaout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LibrosPage />,
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
