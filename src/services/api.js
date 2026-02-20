// src/services/api.js
const RAW_API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const API_URL = RAW_API_URL.replace(/\/+$/, "");

function buildUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${p}`;
}

function isAuthEndpoint(path) {
  // Evita refresh loops en endpoints de auth
  return path.startsWith("/api/v1/auth/");
}

export async function apiFetch(path, options = {}) {
  const url = buildUrl(path);

  const method = (options.method || "GET").toUpperCase();
  const body = options.body ?? null;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const headers = { ...(options.headers || {}) };
  const hasContentType =
    Object.prototype.hasOwnProperty.call(headers, "Content-Type") ||
    Object.prototype.hasOwnProperty.call(headers, "content-type");

  if (!isFormData && body !== null && !hasContentType) {
    headers["Content-Type"] = "application/json";
  }

  const doFetch = async () =>
    fetch(url, {
      ...options,
      method,
      credentials: "include",
      headers,
      body,
    });

  let res = await doFetch();

  // ✅ Si es endpoint de auth, NO hacemos refresh automático
  if (isAuthEndpoint(path)) {
    return await parseResponse(res);
  }

  // Si NO es 401, normal
  if (res.status !== 401) return await parseResponse(res);

  // 401 => intentar refresh 1 vez
  const refreshOk = await tryRefresh();
  if (!refreshOk) {
    await tryLogoutSilently(); // limpia cookies HTTPOnly
    throw new Error("Sesión expirada. Volvé a iniciar sesión.");
  }

  res = await doFetch();
  return await parseResponse(res);
}

async function tryRefresh() {
  try {
    const refreshRes = await fetch(buildUrl("/api/v1/auth/refresh/"), {
      method: "POST",
      credentials: "include",
    });
    return refreshRes.ok;
  } catch {
    return false;
  }
}

async function tryLogoutSilently() {
  try {
    await fetch(buildUrl("/api/v1/auth/logout/"), {
      method: "POST",
      credentials: "include",
    });
  } catch {}
}

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  let data;

  if (contentType.includes("application/json")) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => "");
  }

  if (!res.ok) {
    const msg =
      (data && (data.detail || data.mensaje || data.error)) ||
      `Error HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}