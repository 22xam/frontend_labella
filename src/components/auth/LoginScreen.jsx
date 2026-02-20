import React, { useState } from "react";
import { login, me } from "../../services/auth";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      await login(username, password);
      const user = await me();
      setStatus(`Bienvenido, ${user?.username || username}.`);
    } catch (error) {
      setStatus(error.message || "No se pudo iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-app">
      <section className="login-phone">
        <div className="login-brand">
          <p className="login-eyebrow">Labella Drive</p>
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">Pantalla estilo Uber optimizada para celular.</p>
        </div>

        <div className="login-hero">
          <p className="login-hero-note">Viaja seguro</p>
          <p className="login-hero-text">Tu próxima ruta empieza aquí.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-field">
            <span className="login-label">
              👤 Usuario
            </span>
            <input
              type="text"
              placeholder="tu_usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="login-input"
              autoComplete="username"
              required
            />
          </label>

          <label className="login-field">
            <span className="login-label">
              🔒 Contraseña
            </span>
            <div className="login-password-row">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login-input-password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="login-toggle"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <button type="submit" disabled={isLoading} className="login-submit">
            {isLoading ? "Ingresando..." : "Entrar"}
          </button>

          {status && <p className="login-status">{status}</p>}
        </form>
      </section>
    </main>
  );
};
