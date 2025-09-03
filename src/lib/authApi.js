import axios from "axios";

// Separate axios instance for authentication endpoints
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Include cookies for refresh tokens
});

// Simple error handling (no token logic needed)
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Auth API Error:", error);
    return Promise.reject(error);
  }
);

export default authApi;
