import apiClient, { publicApiClient } from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";
import { TokenService } from "@/lib/tokenService";

export const loginUser = async (data) => {
  const response = await publicApiClient.post(ENDPOINTS.AUTH.LOGIN, data);

  // Assume backend returns { accessToken }
  const token = response.data.accessToken;
  TokenService.setToken(token);

  return response.data;
};

export const registerUser = async (data) => {
  const response = await publicApiClient.post(ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

export const sendOTP = async ({ email, purpose }) => {
  console.log("Sending OTP to:", email, "Purpose:", purpose);
  try {
    const response = await publicApiClient.post(ENDPOINTS.OTP.SEND, { email, purpose });
    console.log("OTP Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("OTP Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
};

export const getCurrentUser = async () => {
  const response = await apiClient.get(ENDPOINTS.AUTH.ME);
  return response.data;
};

export const logoutUser = () => {
  TokenService.removeToken();
};