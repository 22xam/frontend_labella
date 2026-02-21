export function ProductosLoading() {
  return <p className="py-6 text-center text-sm text-neutral-400">Cargando productos...</p>;
}

export function ProductosError({ message, onRetry }) {
  return (
    <div className="space-y-3 py-6 text-center">
      <p className="text-sm text-rose-300">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold"
      >
        Reintentar
      </button>
    </div>
  );
}

export function ProductosEmpty() {
  return <p className="py-6 text-center text-sm text-neutral-500">No hay productos para mostrar.</p>;
}
