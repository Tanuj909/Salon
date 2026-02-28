import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const getMyBusinessBookings = async (businessId, page = 0, size = 20, sort = "createdAt,desc") => {
  const response = await apiClient.get(ENDPOINTS.BOOKINGS.MY_BUSINESS(businessId), {
    params: { page, size, sort },
  });
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await apiClient.post(ENDPOINTS.BOOKINGS.CREATE, bookingData);
  return response.data;
};
