import axios from "axios";
import Cookies from "js-cookie";
import authApi from "./authApi"; // Import the dedicated auth API

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    let accessToken = Cookies.get("token");

    // If the token is about to expire, refresh it
    if (!accessToken || isTokenExpired(accessToken)) {
      try {
        const newToken = await refreshToken();
        //console.log(" newtoken generated : ", newToken);
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 5);
        Cookies.set("token", newToken, { path: "/", expires: expirationDate });
        config.headers.Authorization = `Bearer ${newToken}`; // Set the new token in the request
        accessToken = newToken;
      } catch (error) {
        //console.error("Failed to refresh token:", error);
        // Redirect to login if refresh fails
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        // Abort the request
        return Promise.reject(error);
      }
    } else {
      // Add the access token to the request headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp <= currentTime + 60; // Refresh if token expires in less than 1 minute or is expired
  } catch (error) {
    //console.error("Error decoding token:", error);
    return true; // Assume token is expired if decoding fails
  }
};

// Function to refresh the token
const refreshToken = async () => {
  try {
    // Use authApi to avoid interceptor circular dependency
    const response = await authApi.get("/auth/token/refresh");

    if (response.data.token) {
      //console.log("new token in refreshToken function : ", response.data.token);
      return response.data.token; // Return the new access token
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    //console.error("Error refreshing token:", error);
    throw error;
  }
};

export default api;
