import { useCallback, useEffect, useState } from "react";
import { getProductos, searchProductos } from "../services/productos";

export function useProductos() {
  const [query, setQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProductos = useCallback(async (searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      const items = searchTerm.trim()
        ? await searchProductos(searchTerm)
        : await getProductos();
      setProductos(items);
    } catch (err) {
      setError(err.message || "No se pudo cargar productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProductos(query);
    }, 250);

    return () => clearTimeout(timeout);
  }, [loadProductos, query]);

  return {
    query,
    setQuery,
    productos,
    loading,
    error,
    reload: () => loadProductos(query),
  };
}
