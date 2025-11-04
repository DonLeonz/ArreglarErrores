import axiosInstance from "../axios.instance"

// Autenticación
export const loginRequest = async (login) => axiosInstance.post("/users/login", login);

export const registerRequest = async (user) => axiosInstance.post("/users/register", user);

export const verifyToken = async () => axiosInstance.get("/users/verify-session");

// Administración de usuarios
export const searchUsersRequest = async (requestParams) => axiosInstance.get("/users/search", { params: requestParams });

export const getUserRequest = async (userId) => axiosInstance.get(`/users/${userId}`);

export const updateUserRoleRequest = async (userId, roleData) => axiosInstance.put(`/users/update-role/${userId}`, roleData);

export const toggleUserStatusRequest = async (userId) => axiosInstance.patch(`/users/toggle-status/${userId}`);

export const deleteUserRequest = async (userId) => axiosInstance.delete(`/users/${userId}`);