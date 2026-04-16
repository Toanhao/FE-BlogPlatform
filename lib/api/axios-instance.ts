import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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
