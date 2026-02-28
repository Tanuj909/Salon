import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const getBusinessReviews = async (businessId, page = 0, size = 10, sortBy = "rating", sortDir = "DESC") => {
    const response = await apiClient.get(ENDPOINTS.REVIEWS.BY_BUSINESS(businessId), {
        params: { page, size, sortBy, sortDir },
    });
    return response.data;
};

export const createReview = async (reviewData) => {
    const response = await apiClient.post(ENDPOINTS.REVIEWS.CREATE, reviewData);
    return response.data;
};
