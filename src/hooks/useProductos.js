import { useCallback, useEffect, useState } from "react";
import { getProductos, searchProductos } from "../services/productos";

export function useProductos() {
  const [query, setQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProductos = useCallback(async (searchTerm = "", page = 1) => {
    setLoading(true);
    setError("");

    try {
      const result = searchTerm.trim() ? await searchProductos(searchTerm, page) : await getProductos();
      setProductos(result.items);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "No se pudo cargar productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProductos(query, 1);
    }, 250);

    return () => clearTimeout(timeout);
  }, [loadProductos, query]);

  const canPaginate = query.trim().length > 0;

  return {
    query,
    setQuery,
    productos,
    pagination,
    canPaginate,
    loading,
    error,
    reload: () => loadProductos(query, pagination.page),
    goToPage: (page) => loadProductos(query, page),
  };
}
