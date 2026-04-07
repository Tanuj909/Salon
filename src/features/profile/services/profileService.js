import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const updateCustomerProfile = async (profileData) => {
    const response = await apiClient.put(
        ENDPOINTS.CUSTOMER.CURRENT,
        profileData
    );
    return response.data;
};

export const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
        ENDPOINTS.USER.PROFILE_IMAGE,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteProfileImage = async () => {
    const response = await apiClient.delete(
        ENDPOINTS.USER.PROFILE_IMAGE
    );
    return response.data;
};
