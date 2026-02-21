function formatPrice(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function ProductosTable({ productos, isLoading, error }) {
  if (isLoading) {
    return <p className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">Cargando productos...</p>;
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-red-400/40 bg-red-500/10 p-5 text-sm text-red-200">
        {error}
      </p>
    );
  }

  if (!productos.length) {
    return <p className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">No hay productos para mostrar.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-neutral-900/80 text-neutral-300">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.numpro} className="border-t border-white/10">
              <td className="px-4 py-3 font-medium">{producto.numpro}</td>
              <td className="px-4 py-3 text-neutral-200">{producto.descripcion}</td>
              <td className="px-4 py-3">{formatPrice(producto.precio_lista_1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
