import { TokenService } from "@/lib/tokenService";

export const applyInterceptors = (axiosInstance) => {

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Clear token immediately
        TokenService.removeToken();

        // Redirect to login if on client side
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        // Return a pending promise that never resolves/rejects to "swallow" the error
        // and prevent UI flashes of "Failed to fetch" or similar error states
        return new Promise(() => { });
      }
      return Promise.reject(error);
    }
  );
};