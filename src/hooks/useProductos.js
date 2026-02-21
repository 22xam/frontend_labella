import { useCallback, useEffect, useMemo, useState } from "react";
import { getProductos } from "../services/productos";

const DEFAULT_FILTERS = {
  search: "",
  ordering: "descripcion",
  page: 1,
  pageSize: 20,
};

export function useProductos(initialFilters = {}) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });
  const [productos, setProductos] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProductos = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await getProductos(filters);
      setProductos(res?.data?.productos || []);
      setPagination(res?.data?.pagination || null);
    } catch (err) {
      setError(err?.message || "No se pudieron cargar los productos.");
      setProductos([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return pagination.total_pages || pagination.pages || 1;
  }, [pagination]);

  const updateSearch = (search) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const updateOrdering = (ordering) => {
    setFilters((prev) => ({ ...prev, ordering, page: 1 }));
  };

  const updatePage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return {
    filters,
    productos,
    pagination,
    totalPages,
    isLoading,
    error,
    refetch: fetchProductos,
    updateSearch,
    updateOrdering,
    updatePage,
  };
}
