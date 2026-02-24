import axios from "axios";
import { applyInterceptors } from "./interceptors";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

applyInterceptors(apiClient);

export default apiClient;