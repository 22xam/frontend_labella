import { useState } from "react";
import MobileScreen from "../components/layout/MobileScreen";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      const user = await onLogin(username, password);
      setStatus(`OK ✅ Bienvenido: ${user?.username || username || "usuario"}`);
    } catch (err) {
      setStatus(`Error: ${err?.message || "No se pudo iniciar sesión."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isOk = status.startsWith("OK");

  return (
    <MobileScreen>
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <span className="text-sm font-extrabold tracking-tight">
                LB&Y
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] text-neutral-400">
                LA BELLA Y YO
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Acceso interno
              </h1>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right backdrop-blur">
            <p className="text-[11px] font-semibold text-neutral-200">
              Privado
            </p>
            <p className="text-[10px] text-neutral-400">Empresa</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          Iniciá sesión para continuar.
        </p>
      </header>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-200">
              Usuario
            </span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20 focus:bg-neutral-900"
              placeholder="usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              inputMode="text"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-200">
              Contraseña
            </span>

            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20 focus:bg-neutral-900"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 rounded-2xl border border-white/10 bg-neutral-900/60 px-3 py-3 text-sm text-neutral-200 transition hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                title={showPassword ? "Ocultar" : "Mostrar"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Ingresando..." : "Entrar"}
          </button>

          {status ? (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                isOk
                  ? "border-green-500/30 bg-green-500/10 text-green-200"
                  : "border-red-500/30 bg-red-500/10 text-red-200"
              }`}
              role="status"
              aria-live="polite"
            >
              {status}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">
              Tip: el botón se deshabilita mientras se autentica.
            </p>
          )}
        </form>
      </section>

      <footer className="mt-auto pt-6 text-center">
        <p className="text-[11px] text-neutral-600">
          © {new Date().getFullYear()} · Sistema interno - Desarrollado por
          Suarez Matias -
        </p>
      </footer>
    </MobileScreen>
  );
}
