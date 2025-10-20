import axios from "axios";
import authApi from "./authApi"; // dedicated auth API (no token logic)

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// No access token injection; rely on HttpOnly cookies and server to read them
// Add a response interceptor to auto-refresh on 401 and retry once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not already retried, attempt refresh then retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authApi.get("/auth/token/refresh", { withCredentials: true });
        // After refresh sets new cookies, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed; fall through to redirect
      }
    }

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;



//  use this instance for all functionalities that require authentication