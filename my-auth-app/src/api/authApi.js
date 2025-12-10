import axiosClient from "./axiosClient";

const authApi = {
    login: (data) => axiosClient.post("/auth/login", data),
    logout: () => axiosClient.post("/auth/logout"),
    getProfile: () => axiosClient.get("/auth/profile"),
};

export default authApi;