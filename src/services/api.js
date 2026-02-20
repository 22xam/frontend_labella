// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

/**
 * apiFetch: wrapper fetch con cookies HTTPOnly (credentials: "include")
 * - Si recibe 401, intenta refresh y reintenta 1 vez.
 * - Soporta JSON y FormData sin romper Content-Type.
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path}`;

  const method = options.method || "GET";
  const body = options.body;

  // Detectar FormData para no setear Content-Type manualmente
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const headers = {
    ...(options.headers || {}),
  };

  if (!isFormData) {
    // Si el caller no manda Content-Type, asumimos JSON
    if (!headers["Content-Type"] && !headers["content-type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  const doFetch = async () => {
    return fetch(url, {
      ...options,
      method,
      credentials: "include",
      headers,
      body,
    });
  };

  let res = await doFetch();

  // Si NO es 401, devolver directo
  if (res.status !== 401) {
    return await parseResponse(res);
  }

  // 401 => intentar refresh
  const refreshRes = await fetch(`${API_URL}/api/v1/auth/refresh/`, {
    method: "POST",
    credentials: "include",
  });

  if (!refreshRes.ok) {
    // sesión muerta
    throw new Error("Sesión expirada. Volvé a iniciar sesión.");
  }

  // Reintentar request original una sola vez
  res = await doFetch();
  return await parseResponse(res);
}

/** Helper: parsea JSON si puede, si no devuelve texto */
async function parseResponse(res) {
  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      data?.detail ||
      data?.mensaje ||
      data?.error ||
      `Error HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}