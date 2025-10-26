import axios from "axios";

import { verifyToken } from "./requests/users.request";
import { useAuth } from "../context/AuthContext";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const { logout } = useAuth();

    if (token) {
      try {
        const res = await verifyToken();

        if (res.status === 401) {
          console.log("Invalid or Expired Token: ", res);
          logout();
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }

      } catch (error) {
        console.log(error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
