import { formatPrice } from "./priceUtils";

export default function ProductoCardHeader({ codigo, descripcion, precio }) {
  return (
    <div className="grid grid-cols-[25px_minmax(0,1fr)_66px] items-start gap-2 text-xs sm:text-sm">
      <p className="font-semibold text-neutral-100">{codigo}</p>
      <p className="line-clamp-3 text-neutral-200">{descripcion}</p>
      <p className="text-right font-semibold text-emerald-300">${formatPrice(precio)}</p>
    </div>
  );
}
