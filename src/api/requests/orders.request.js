import axiosInstance from "../axios.instance"

export const createOrderRequest = async (order) => axiosInstance.post("/orders/create", order);