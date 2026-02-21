export function formatPrice(value) {
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
  });
}

export function getPrecioContado(precio) {
  return precio * 0.9;
}

export function getPrecioTransferencia(precio) {
  return precio * 0.95;
}
