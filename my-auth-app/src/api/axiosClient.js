import axios from "axios";
import { getToken, setToken, clearToken } from "../utils/storage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 

const axiosClient = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Access Token
axiosClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
     
    return config;
});


// Handle Refresh Token
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem("refreshToken");
                
                if (!refresh){
                    throw new Error("No refresh token");
                }
                
                const res = await axios.post("http://localhost:3000/api/auth/refresh", {
                    refreshToken: refresh,
                });

                const newAccessToken = res.data.accessToken;
                setToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosClient(originalRequest);
            } catch (err) {
                clearToken();

                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;