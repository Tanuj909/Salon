import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const registerBusiness = async (payload) => {
  const response = await apiClient.post(
    ENDPOINTS.BUSINESS.REGISTER,
    payload
  );

  return response.data;
};