import ProductoCardHeader from "./ProductoCardHeader";
import ProductoPriceInfo from "./ProductoPriceInfo";
import { getPrecioContado, getPrecioTransferencia } from "./priceUtils";

export default function ProductoCard({ producto, isExpanded, onToggle }) {
  const precioContado = getPrecioContado(producto.precio);
  const precioTransferencia = getPrecioTransferencia(producto.precio);

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="w-full rounded-2xl border border-white/10 bg-neutral-900/40 px-3 py-3 text-left transition hover:border-cyan-300/40 hover:bg-neutral-800/60"
      >
        <ProductoCardHeader
          codigo={producto.codigo}
          descripcion={producto.descripcion}
          precio={producto.precio}
        />

        {isExpanded ? (
          <ProductoPriceInfo
            precioContado={precioContado}
            precioTransferencia={precioTransferencia}
          />
        ) : (
          <p className="mt-2 text-[11px] text-cyan-300/70">Tocá para ver precios informativos</p>
        )}
      </button>
    </li>
  );
}
