function ProductRow({ producto }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-neutral-900/40 px-3 py-3">
      <div className="grid grid-cols-[25px_minmax(0,1fr)_66px] items-start gap-2 text-xs sm:text-sm">
        <p className="font-semibold text-neutral-100">{producto.codigo}</p>
        <p className="line-clamp-3 text-neutral-200">{producto.descripcion}</p>
        <p className="text-right font-semibold text-emerald-300">
          $
          {producto.precio.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    </li>
  );
}

export default function ProductosList({ productos }) {
  return (
    <>
      <div className="mb-2 grid grid-cols-[80px_1fr_84px] gap-2 px-1 text-[11px] uppercase tracking-wide text-neutral-500">
        <span>Código</span>
        <span>Descripción</span>
        <span className="text-right">Precio</span>
      </div>
      <ul className="space-y-2">
        {productos.map((producto) => (
          <ProductRow key={producto.id} producto={producto} />
        ))}
      </ul>
    </>
  );
}
