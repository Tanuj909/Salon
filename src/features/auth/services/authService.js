import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";
import { TokenService } from "@/lib/tokenService";

export const loginUser = async (data) => {
  const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, data);

  // Assume backend returns { accessToken }
  const token = response.data.accessToken;
  TokenService.setToken(token);

  return response.data;
};

export const registerUser = async (data) => {
  const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get(ENDPOINTS.AUTH.ME);
  return response.data;
};

export const logoutUser = () => {
  TokenService.removeToken();
};