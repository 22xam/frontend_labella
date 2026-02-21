import { Search } from "lucide-react";

export default function ProductosSearchBar({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-neutral-900/70 px-3 py-2">
      <Search size={16} className="text-neutral-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por código, descripción, barra o coddum"
        className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
      />
    </label>
  );
}
