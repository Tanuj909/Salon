import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const submitContactQuery = async (queryData) => {
  const response = await apiClient.post(ENDPOINTS.SUPPORT.SUBMIT, queryData);
  return response.data;
};

export const fetchMyQueries = async (page = 0, size = 5) => {
  const response = await apiClient.get(ENDPOINTS.SUPPORT.MY_QUERIES(page, size));
  return response.data;
};
