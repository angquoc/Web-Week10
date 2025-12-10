let memoryToken = null;

export const setToken = (token) => {
    memoryToken = token;
};

export const getToken = () => {
    return memoryToken;
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const clearToken = () => {
    memoryToken = null;
    localStorage.removeItem("refreshToken");
};