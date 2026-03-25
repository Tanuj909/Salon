import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";
import { publicApiClient } from "@/services/apiClient";

export const registerBusiness = async (payload) => {
  const response = await apiClient.post(
    ENDPOINTS.BUSINESS.REGISTER,
    payload
  );

  return response.data;
};

export const fetchBusinesses = async (page = 0, size = 10) => {
  const response = await publicApiClient.get(
    `${ENDPOINTS.BUSINESS.LIST}?page=${page}&size=${size}&sortBy=id&sortDirection=ASC`
  );
  return response.data;
};

export const getMyBusiness = async () => {
  const response = await apiClient.get(ENDPOINTS.BUSINESS.MY_BUSINESS);
  return response.data;
};

export const uploadDocument = async (businessId, documentType, file) => {
  const formData = new FormData();
  
  // Create a Blob for the JSON data to specify the Content-Type as application/json
  const dataBlob = new Blob([JSON.stringify({ documentType })], {
    type: "application/json",
  });
  
  formData.append("data", dataBlob);
  formData.append("file", file);

  const response = await apiClient.post(
    ENDPOINTS.BUSINESS.UPLOAD_DOCUMENT(businessId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getDocuments = async (businessId) => {
  const response = await apiClient.get(
    ENDPOINTS.BUSINESS.GET_DOCUMENTS(businessId)
  );
  return response.data;
};
