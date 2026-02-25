import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export const getCustomerProfile = async () => {
     const response = apiClient.get(ENDPOINTS.CUSTOMER.CURRENT);
     return (await response).data;
}
