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
  const { query, setQuery, productos, loading, error, reload } = useProductos();

  return (
    <PanelCard
      title="Productos"
      subtitle="Listado optimizado para mobile (máximo 10 registros)."
      className="flex min-h-0 flex-col"
    >
      <div className="space-y-3">
        <ProductosSearchBar value={query} onChange={setQuery} />
        {loading ? <ProductosLoading /> : null}
        {!loading && error ? <ProductosError message={error} onRetry={reload} /> : null}
        {!loading && !error && productos.length === 0 ? <ProductosEmpty /> : null}
        {!loading && !error && productos.length > 0 ? <ProductosList productos={productos} /> : null}
      </div>
    </PanelCard>
  );
}
