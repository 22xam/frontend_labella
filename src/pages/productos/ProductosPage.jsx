import PanelCard from "../../components/ui/PanelCard";
import ProductosList from "../../components/productos/ProductosList";
import ProductosSearchBar from "../../components/productos/ProductosSearchBar";
import {
  ProductosEmpty,
  ProductosError,
  ProductosLoading,
} from "../../components/productos/ProductosFeedback";
import { useProductos } from "../../hooks/useProductos";

export default function ProductosPage() {
  const {
    query,
    setQuery,
    productos,
    pagination,
    canPaginate,
    loading,
    error,
    reload,
    goToPage,
  } = useProductos();

  const isFirstPage = pagination.page <= 1;
  const isLastPage = pagination.page >= pagination.totalPages;

  return (
    <PanelCard
      title="Productos"
      subtitle="Mostramos 5 productos al ingresar. Al buscar, podés navegar en páginas de 5 resultados."
      className="flex min-h-0 flex-col"
    >
      <div className="space-y-3">
        <ProductosSearchBar value={query} onChange={setQuery} />
        {loading ? <ProductosLoading /> : null}
        {!loading && error ? <ProductosError message={error} onRetry={reload} /> : null}
        {!loading && !error && productos.length === 0 ? <ProductosEmpty /> : null}
        {!loading && !error && productos.length > 0 ? <ProductosList productos={productos} /> : null}

        {!loading && !error && canPaginate && productos.length > 0 ? (
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-neutral-900/40 px-3 py-2 text-xs text-neutral-300">
            <button
              type="button"
              onClick={() => goToPage(pagination.page - 1)}
              disabled={isFirstPage}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>
            <span>
              Página {pagination.page} de {pagination.totalPages}
            </span>
            <button
              type="button"
              onClick={() => goToPage(pagination.page + 1)}
              disabled={isLastPage}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        ) : null}
      </div>
    </PanelCard>
  );
}
