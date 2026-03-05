import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const registerBusiness = async (payload) => {
  const response = await apiClient.post(
    ENDPOINTS.BUSINESS.REGISTER,
    payload
  );

  return response.data;
};

export const fetchBusinesses = async (page = 0, size = 10) => {
  const response = await apiClient.get(
    `${ENDPOINTS.BUSINESS.LIST}?page=${page}&size=${size}&sortBy=id&sortDirection=ASC`
  );
  return response.data;
};
