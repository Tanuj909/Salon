export const TokenService = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  setToken: (token) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", token);
  },

  removeToken: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
  },
};