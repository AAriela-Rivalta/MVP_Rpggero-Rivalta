import { useEffect, useState } from "react";
import { fetchLibros } from "../services/api";

export function useLibros() {
  const [libros, setLibros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchLibros()
      .then((data) => {
        if (mounted) {
          setLibros(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { libros, loading, error };
}
