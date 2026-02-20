// src/services/auth.js
import { apiFetch } from "./api";

/**
 * LOGIN
 * - Según tu script, el backend espera multipart/form-data (curl -F).
 */
export function login(username, password) {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);

  return apiFetch("/api/v1/auth/login/", {
    method: "POST",
    body: form,
  });
}

/**
 * ME (usuario actual)
 * - Endpoint protegido; si access expira, apiFetch refresca y reintenta.
 */
export function me() {
  return apiFetch("/api/v1/me/", { method: "GET" });
}

/**
 * REFRESH (opcional llamarlo manualmente)
 * - apiFetch ya lo hace solo al detectar 401.
 */
export function refresh() {
  return apiFetch("/api/v1/auth/refresh/", { method: "POST" });
}

/**
 * LOGOUT
 * - Borra cookies del lado backend (Set-Cookie expirando).
 */
export function logout() {
  return apiFetch("/api/v1/auth/logout/", { method: "POST" });
}