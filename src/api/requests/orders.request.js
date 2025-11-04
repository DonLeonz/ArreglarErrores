import axiosInstance from "../axios.instance"

// Crear orden (para clientes)
export const createOrderRequest = async (order) => axiosInstance.post("/orders/create", order);

// Buscar órdenes (para admin)
export const searchOrdersRequest = async (requestParams) => axiosInstance.get("/orders/search", { params: requestParams });

// Obtener una orden específica
export const getOrderRequest = async (orderId) => axiosInstance.get(`/orders/${orderId}`);

// Actualizar estado de una orden
export const updateOrderStatusRequest = async (orderId, statusData) => axiosInstance.patch(`/orders/update-status/${orderId}`, statusData);

// Eliminar una orden
export const deleteOrderRequest = async (orderId) => axiosInstance.delete(`/orders/${orderId}`);