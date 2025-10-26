import axiosInstance from "../axios.instance"

export const createProductRequest = async (product) => axiosInstance.post("/products/create", product);

export const modifyProductRequest = async (productId, product) => axiosInstance.post(`/products/modify/${productId}`, product);

export const searchAllProductCategoriesRequest = async () => axiosInstance.get("/product-categories/search");

export const searchProductsRequest = async (requestParams) => axiosInstance.get("/products/search", null, { params: requestParams });