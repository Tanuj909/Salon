import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const fetchAgreements = async (businessId, page = 0, size = 10) => {
  const response = await apiClient.get(ENDPOINTS.AGREEMENTS.BY_BUSINESS(businessId), {
    params: {
      page,
      size,
      sort: 'signedAt,desc'
    }
  });
  return response.data;
};

export const acceptAgreement = async (agreementId, data) => {
  const response = await apiClient.post(ENDPOINTS.AGREEMENTS.ACCEPT(agreementId), data);
  return response.data;
};
