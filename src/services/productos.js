import { apiFetch } from "./api";

const PRODUCTOS_PATH = "/api/v1/productos/";
const BUSCAR_PATH = "/api/v1/productos/buscar/";
const MAX_PRODUCTOS = 10;

function toNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : 0;
}

function mapProducto(raw) {
  return {
    id: raw.id ?? raw.pk ?? `${raw.numpro ?? ""}-${raw.codigo_barra ?? ""}`,
    codigo: raw.numpro ?? "-",
    descripcion: raw.descripcion ?? "Sin descripción",
    precio: toNumber(raw.precio_lista_1),
    codigoBarra: raw.codigo_barra ?? "",
    coddum: raw.coddum ?? "",
  };
}

function ensureArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function filterProductos(productos, term) {
  const value = term.trim().toLowerCase();
  if (!value) return productos;

  return productos.filter((producto) =>
    [producto.codigo, producto.descripcion, producto.codigoBarra, producto.coddum]
      .map((field) => String(field || "").toLowerCase())
      .some((field) => field.includes(value))
  );
}

export async function getProductos() {
  const data = await apiFetch(PRODUCTOS_PATH);
  return ensureArray(data).map(mapProducto).slice(0, MAX_PRODUCTOS);
}

export async function searchProductos(term) {
  const value = term.trim();
  if (!value) {
    return getProductos();
  }

  const query = new URLSearchParams({ q: value });

  try {
    const data = await apiFetch(`${BUSCAR_PATH}?${query.toString()}`);
    return ensureArray(data).map(mapProducto).slice(0, MAX_PRODUCTOS);
  } catch {
    const productos = await getProductos();
    return filterProductos(productos, value).slice(0, MAX_PRODUCTOS);
  }
}
