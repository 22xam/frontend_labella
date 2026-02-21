import { useState } from "react";
import ProductoCard from "./ProductoCard";

export default function ProductosList({ productos }) {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const toggleProduct = (productId) => {
    setExpandedProductId((currentProductId) => (currentProductId === productId ? null : productId));
  };

  return (
    <>
      <div className="mb-2 grid grid-cols-[80px_1fr_84px] gap-2 px-1 text-[11px] uppercase tracking-wide text-neutral-500">
        <span>Código</span>
        <span>Descripción</span>
        <span className="text-right">Precio</span>
      </div>
      <ul className="space-y-2">
        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            isExpanded={expandedProductId === producto.id}
            onToggle={() => toggleProduct(producto.id)}
          />
        ))}
      </ul>
    </>
  );
}
