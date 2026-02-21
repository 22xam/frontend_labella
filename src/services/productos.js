import { apiFetch } from "./api";

export function getProductos({ search = "", ordering = "descripcion", page = 1, pageSize = 20 } = {}) {
  const params = new URLSearchParams();

  if (search.trim()) params.set("search", search.trim());
  if (ordering) params.set("ordering", ordering);
  if (page) params.set("page", String(page));
  if (pageSize) params.set("page_size", String(pageSize));

  return apiFetch(`/api/v1/productos/?${params.toString()}`, { method: "GET" });
}
