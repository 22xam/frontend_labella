import { apiFetch } from "./api";

const PRODUCTOS_PATH = "/api/v1/productos/";
const BUSCAR_PATH = "/api/v1/productos/buscar/";
const MAX_PRODUCTOS = 5;

function toNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : 0;
}

function mapProducto(raw) {
  const barcode =
    raw?.codes?.barcode ??
    raw?.codigoBarra ??
    raw?.codigo_barra ??
    "";

  const dum =
    raw?.codes?.dum ??
    raw?.dum ??
    raw?.coddum ??
    raw?.cod_dum ??
    "";

  const descripcion = raw?.descripcion ?? raw?.displayName ?? "Sin descripción";

  return {
    id: raw?.id ?? raw?.pk ?? raw?.numpro ?? `${raw?.numpro ?? ""}-${barcode}`,
    codigo: raw?.numpro ?? "-",
    descripcion: String(descripcion).trim(),
    // ✅ L1 viene dentro de: prices.list.l1
    precio: toNumber(raw?.prices?.list?.l1),
    codigoBarra: String(barcode).trim(),
    coddum: String(dum).trim(),
  };
}

function ensureArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data?.productos)) return payload.data.productos;
  if (Array.isArray(payload?.productos)) return payload.productos;
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