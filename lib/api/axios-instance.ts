import axios from "axios";
import { getToken } from "@/lib/auth-storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tự động thêm Bearer token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu 401, có thể log out hoặc refresh token
    if (error.response?.status === 401) {
      // TODO: Trigger logout action hoặc refresh token
    }
    return Promise.reject(error);
  },
);

export default apiClient;
