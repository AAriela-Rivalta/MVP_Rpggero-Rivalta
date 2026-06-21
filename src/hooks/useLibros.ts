import { useEffect, useState } from "react";

import { getLibros } from "../api";

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarLibros() {
      try {
        setLoading(true);
        const data = await getLibros();

        setLibros(data.rows);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los libros");
      } finally {
        setLoading(false);
      }
    }

    cargarLibros();
  }, []);

  return {
    libros,
    loading,
    error,
  };
}
