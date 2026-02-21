const wait = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardSnapshot() {
  await wait();

  return {
    productos: [
      { id: 1, nombre: "Shampoo hidratante", stock: 23 },
      { id: 2, nombre: "Acondicionador brillo", stock: 15 },
      { id: 3, nombre: "Crema peinar", stock: 8 },
    ],
    pedidos: [
      { id: "PD-101", cliente: "Lucía", estado: "En camino" },
      { id: "PD-102", cliente: "Martín", estado: "Preparando" },
    ],
    mensajes: [
      { id: "M-22", de: "Depósito", texto: "Llegan cajas nuevas mañana" },
      { id: "M-21", de: "Admin", texto: "Confirmar stock semanal" },
    ],
  };
}
