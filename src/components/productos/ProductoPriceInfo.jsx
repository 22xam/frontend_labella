import { formatPrice } from "./priceUtils";

function PriceInfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-black/20 px-2 py-1.5">
      <span className="text-neutral-200">{label}</span>
      <span className="font-semibold text-emerald-300">${formatPrice(value)}</span>
    </div>
  );
}

export default function ProductoPriceInfo({ precioContado, precioTransferencia }) {
  return (
    <div className="mt-3 grid gap-2 rounded-xl border border-cyan-200/20 bg-cyan-400/5 p-3 text-xs sm:text-sm">
      <p className="text-neutral-300">Valores informativos</p>
      <PriceInfoRow label="Precio de contado (-10%)" value={precioContado} />
      <PriceInfoRow label="Precio transferencia (-5%)" value={precioTransferencia} />
    </div>
  );
}
