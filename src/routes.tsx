import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import LibrosPage from "./pages/LibrosPage";
import CargarLibros from "./pages/CargarLibros";
import EditarLibros from "./pages/EditarLibros";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "editar",
        element: <EditarLibros />,
      },
    ],
  },
]);