export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },

  OTP: {
    SEND: "/auth/send-otp"
  },

  CUSTOMER: {
    CURRENT: "/customers/me",
  },

  SALON: {
    NEARBY: (lat, lng, radius) => `/businesses/nearby?latitude=${lat}&longitude=${lng}&radiusInKm=${radius}`,

    DETAILS: (id) => `/businesses/${id}`,

    STAFF: (id) => `/staff/business/${id}`,
    STAFF_PROFILE: (id) => `/staff/${id}`,
    SERVICES: (id) => `/services/business/${id}/active`,
  },

  REVIEWS: {
    BY_BUSINESS: (businessId) => `/reviews/business/${businessId}`,
    CREATE: "/reviews",
  },

  BOOKINGS: {
    CREATE: "/bookings",
    MY_BOOKINGS: "/bookings/my",
    MY_BUSINESS: (businessId) => `/bookings/my/business/${businessId}`,
    CANCEL: (id) => `/bookings/my/${id}/cancel`,
  },

  BUSINESS: {
    REGISTER: "/businesses/register",
  },
};
