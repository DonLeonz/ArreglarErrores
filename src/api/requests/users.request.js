import axiosInstance from "../axios.instance"

export const loginRequest = async (login) => axiosInstance.post("/users/login", login);

export const registerRequest = async (user) => axiosInstance.post("/users/register", user);

export const verifyToken = async () => axiosInstance.get("/users/verify-session");