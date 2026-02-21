const ORDER_OPTIONS = [
  { value: "descripcion", label: "Descripción (A-Z)" },
  { value: "-descripcion", label: "Descripción (Z-A)" },
  { value: "numpro", label: "Código (menor a mayor)" },
  { value: "-numpro", label: "Código (mayor a menor)" },
  { value: "precio_lista_1", label: "Precio (menor a mayor)" },
  { value: "-precio_lista_1", label: "Precio (mayor a menor)" },
];

export default function ProductosFilters({ search, ordering, onSearchChange, onOrderingChange }) {
  return (
    <section className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_auto]">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm outline-none focus:border-white/30"
        placeholder="Buscar por descripción, código de barra, dum o proveedor"
      />

      <select
        value={ordering}
        onChange={(e) => onOrderingChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm outline-none focus:border-white/30"
      >
        {ORDER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-neutral-900">
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}
