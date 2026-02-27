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

export const getAllSalonStaff = async (id) => {
  const response = await apiClient.get(
    ENDPOINTS.SALON.STAFF(id)
  );
  return response.data.body.content;
};

export const getStaffProfile = async (staffId) => {
  const response = await apiClient.get(
    ENDPOINTS.SALON.STAFF_PROFILE(staffId)
  );
  return response.data.body;
};

export const getSalonServices = async (id) => {
  const response = await apiClient.get(
    ENDPOINTS.SALON.SERVICES(id)
  );
  return response.data.body.content;
};
