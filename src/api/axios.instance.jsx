import axios from "axios";

const instance = axios.create({
    baseURL: 'http://daisy-dev.westus.cloudapp.azure.com:3000/api',
    withCredentials: true
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;