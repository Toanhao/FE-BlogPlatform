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
    if (error.response?.status === 401) {
      // TODO: logout hoặc refresh token
    }

    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      "Đã có lỗi xảy ra, thử lại sau.";

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
