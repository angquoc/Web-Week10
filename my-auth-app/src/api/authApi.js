import axiosClient from "./axiosClient";

const authApi = {
    login(data) {
    const url = "/api/auth/login"; 
    return axiosClient.post(url, data);
  },

  getProfile() {
    const url = "/api/auth/profile"; 
    return axiosClient.get(url);
  },
  
  logout() {
      return Promise.resolve(); 
  }
};

export default authApi;