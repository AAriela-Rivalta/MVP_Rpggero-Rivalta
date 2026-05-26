import { useEffect, useState } from "react";

import { getLibros } from "../api";

export function useLibros() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    async function cargarLibros() {
      try {
        const data = await getLibros();

        setLibros(data.rows);
      } catch (error) {
        console.error(error);
      }
    }

    cargarLibros();
  }, []);

  return { libros };
}