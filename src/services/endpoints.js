export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },

  SALON: {
    NEARBY: (lat, lng, radius) =>
      `/api/businesses/nearby?latitude=${lat}&longitude=${lng}&radiusInKm=${radius}`,

    DETAILS: (id) => `/api/businesses/${id}`,
  },
};