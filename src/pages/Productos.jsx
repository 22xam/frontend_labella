import { useEffect, useState } from "react";
import PaginationControls from "../components/PaginationControls";
import ProductosFilters from "../components/ProductosFilters";
import ProductosTable from "../components/ProductosTable";
import { useProductos } from "../hooks/useProductos";

export default function ProductosPage() {
  const {
    filters,
    productos,
    totalPages,
    isLoading,
    error,
    updateSearch,
    updateOrdering,
    updatePage,
  } = useProductos();

  const [searchText, setSearchText] = useState(filters.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSearch(searchText);
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchText, updateSearch]);

  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold">Productos</h2>
      <ProductosFilters
        search={searchText}
        ordering={filters.ordering}
        onSearchChange={setSearchText}
        onOrderingChange={updateOrdering}
      />

      <ProductosTable productos={productos} isLoading={isLoading} error={error} />

      <PaginationControls
        page={filters.page}
        totalPages={totalPages}
        onPageChange={updatePage}
      />
    </section>
  );
}
