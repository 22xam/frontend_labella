import { useState } from "react";
import MobileScreen from "../components/layout/MobileScreen";
import logo from "../assets/img/logo.png";

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
            <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-fuchsia-200/20 bg-white/10 backdrop-blur">
              <img src={logo} alt="Logo La Bella y Yo" className="h-9 w-9 object-contain" />
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] text-fuchsia-200/70">
                LA BELLA Y YO
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Acceso interno
              </h1>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-fuchsia-200/20 bg-white/10 px-3 py-2 text-right backdrop-blur">
            <p className="text-[11px] font-semibold text-fuchsia-100">Privado</p>
            <p className="text-[10px] text-fuchsia-200/70">Empresa</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-fuchsia-100/70">
          Iniciá sesión para continuar.
        </p>
      </header>


      <div className="relative mb-5 overflow-hidden rounded-3xl border border-fuchsia-200/20 bg-white/10 p-4 backdrop-blur">
        <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-fuchsia-300/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-violet-300/20 blur-xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-fuchsia-100/70">
              Seguridad activa
            </p>
            <p className="mt-1 text-sm text-fuchsia-50">
              Acceso cifrado y monitoreado en tiempo real.
            </p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-100/30 bg-fuchsia-100/15 text-lg shadow-[0_0_35px_rgba(245,208,254,0.25)]">
            ✨
          </span>
        </div>
      </div>

      <section className="rounded-3xl border border-fuchsia-200/20 bg-white/10 p-5 backdrop-blur">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-200">
              Usuario
            </span>
            <input
              className="w-full rounded-2xl border border-fuchsia-200/20 bg-neutral-900/65 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-fuchsia-200/40 focus:bg-neutral-900"
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
                className="w-full rounded-2xl border border-fuchsia-200/20 bg-neutral-900/65 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-fuchsia-200/40 focus:bg-neutral-900"
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
                className="shrink-0 rounded-2xl border border-fuchsia-200/20 bg-neutral-900/65 px-3 py-3 text-sm text-neutral-200 transition hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-200/30"
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
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-fuchsia-100 via-rose-100 to-fuchsia-200 px-4 py-3 text-sm font-semibold text-fuchsia-950 shadow-[0_12px_28px_rgba(244,114,182,0.22)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
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
            <p className="text-xs text-fuchsia-100/50">
              Tip: el botón se deshabilita mientras se autentica.
            </p>
          )}
        </form>
      </section>

      <footer className="mt-auto pt-6 text-center">
        <p className="text-[11px] text-neutral-500">
          © {new Date().getFullYear()} · Sistema interno - Desarrollado por
          Suarez Matias -
        </p>
      </footer>
    </MobileScreen>
  );
}
