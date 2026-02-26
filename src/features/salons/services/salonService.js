import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const fetchNearbySalons = async (lat, lng, radius = 20) => {
  const response = await apiClient.get(
    ENDPOINTS.SALON.NEARBY(lat, lng, radius)
  );
  return response.data;
};

export const fetchSalonById = async (id) => {
  const response = await apiClient.get(
    ENDPOINTS.SALON.DETAILS(id)
  );
  return response.data;
};
