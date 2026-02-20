export default function TopBar({ username }) {
  return (
    <header className="mb-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <span className="text-sm font-extrabold tracking-tight">LB&Y</span>
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] text-neutral-400">
            LA BELLA Y YO
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">Panel</h1>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right backdrop-blur">
        <p className="text-[11px] font-semibold text-neutral-200">Hola</p>
        <p className="text-[10px] text-neutral-400">{username || "usuario"}</p>
      </div>
    </header>
  );
}
