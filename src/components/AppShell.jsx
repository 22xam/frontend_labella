export default function AppShell({ active, onNavigate, onLogout, children }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-neutral-900/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-neutral-400">LA BELLA Y YO</p>
            <h1 className="text-lg font-semibold">Panel interno</h1>
          </div>

          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate("productos")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                active === "productos"
                  ? "bg-white text-neutral-900"
                  : "border border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10"
              }`}
            >
              Productos
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-200 hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-6">{children}</main>
    </div>
  );
}
