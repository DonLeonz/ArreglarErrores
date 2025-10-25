import axiosInstance from "../axios.instance"

export const createProductRequest = async (product) => axiosInstance.post("/products/create", product);

export const modifyProductRequest = async (productId, product) => axiosInstance.post(`/products/modify/${productId}`, product);

export const searchProductsRequest = async (params) => axiosInstance.get("/products/search", {
    params: {
        id: params.id,
        name: params.name,
        category: params.category,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minStock: params.minStock,
        maxStock: params.maxStock,
        origin: params.origin
    }
});