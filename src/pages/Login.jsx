import { useState } from "react";
import { login, me } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Logueando...");

    try {
      await login(username, password);
      const user = await me();
      setStatus(`OK ✅ Bienvenido: ${user?.username || "usuario"}`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div
      style={{ maxWidth: 420, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Login Labella</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Clave"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: 12 }}>{status}</p>
    </div>
  );
}
