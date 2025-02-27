import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  withCredentials: true, // Include cookies in requests
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get the access token from localStorage or cookies
    const accessToken = Cookies.get("token");

    // If the token is about to expire, refresh it
    if (accessToken && isTokenExpired(accessToken)) {
      
      
      try {
        const newToken = await refreshToken();
        console.log(" newtoken generated : ", newToken);
        Cookies.set("token", newToken, { path: "/" }); // Update the token
        config.headers.Authorization = `Bearer ${newToken}`; // Set the new token in the request
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // Redirect to login if refresh fails
        // if (typeof window !== "undefined") {
        //   window.location.href = "/auth/login";
        // }
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
    return decodedToken.exp - currentTime < 60; // Refresh if token expires in less than 1 minute
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Assume token is expired if decoding fails
  }
};

// Function to refresh the token
const refreshToken = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh`,
    {
      withCredentials: true, // Include cookies
    }
  );
  console.log(" we are here now");
  if (response.data.token) {
    return response.data.token; // Return the new access token
  } else {
    throw new Error("Failed to refresh token");
  }
};

export default api;