import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const updateCustomerProfile = async (profileData) => {
    const response = await apiClient.put(
        ENDPOINTS.CUSTOMER.CURRENT,
        profileData
    );
    return response.data;
};
