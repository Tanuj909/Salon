import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const fetchMessages = async (businessId, page = 0, size = 10) => {
  const response = await apiClient.get(
    `${ENDPOINTS.BUSINESS.MESSAGES(businessId)}?page=${page}&size=${size}&sort=sentAt,desc`
  );
  return response.data;
};

export const sendMessage = async (businessId, message, file = null) => {
  const formData = new FormData();
  
  // Create a Blob for the JSON data to specify the Content-Type as application/json
  const dataBlob = new Blob([JSON.stringify({ message })], {
    type: "application/json",
  });
  
  formData.append("data", dataBlob);
  if (file) {
    formData.append("attachment", file);
  }

  const response = await apiClient.post(
    ENDPOINTS.BUSINESS.MESSAGES(businessId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
