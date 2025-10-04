import { useState, useEffect } from "react";
import authApi from "@/lib/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

// Custom hook for authentication
export const useAuth = () => {
  // state for the user informations
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to read JWT token and extract user info
  const getUserFromToken = (token) => {
    try {
      const payloadPart = token.split(".")[1];
      const decodedPayload = atob(payloadPart);
      const userInfo = JSON.parse(decodedPayload);
      return userInfo;
    } catch (error) {
      console.log("Could not read token:", error);
      return null;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const userInfo = getUserFromToken(token);

      if (userInfo) {
        // Extract user data from JWT payload
        setUser({
          id: userInfo.userId || userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
          fullname: userInfo.fullname,
          role: userInfo.role,
        });
        setIsAuthenticated(true);
      } else {
        // could not read the token - clear everything
        logout();
      }
    } else {
      // No token
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  return {
    user,
    userId: user?.id || null,
    username: user?.username || null,
    isAuthenticated,
    loading,
    logout,
  };
};
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await authApi.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Set tokens in cookies
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 120); // 120 minutes for access token

        Cookies.set("token", response.data.token, {
          expires: expirationDate,
          path: "/",
        });

        Cookies.set(
          "cse_forums_refresh_token",
          response.data.data.refreshToken,
          {
            expires: 1, // 1 day for refresh token
            path: "/",
          }
        );

        // Redirect to home page
        router.push("/");

        return { success: true, data: response.data };
      }
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        errorMessage = "No response from the server. Please try again.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    clearError: () => setError(""),
  };
};
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const signup = async (userData) => {
    setLoading(true);
    setError("");

    try {
      const response = await authApi.post("/auth/signup", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fullname: userData.fullName,
      });

      if (response.status === 201) {
        // Set tokens in cookies
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 15); // 15 minutes for access token

        Cookies.set("token", response.data.token, {
          expires: expirationDate,
          path: "/",
        });

        Cookies.set(
          "cse_forums_refresh_token",
          response.data.data.refreshToken,
          {
            expires: 1, // 1 day for refresh token
            path: "/",
          }
        );

        // Redirect to home page
        router.push("/");

        return { success: true, data: response.data };
      }
    } catch (err) {
      let errorMessage = "Signup failed. Please try again.";

      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        errorMessage = "No response from the server. Please try again.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    error,
    clearError: () => setError(""),
  };
};
export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    setError("");

    try {
      // Call backend logout endpoint (optional - for server-side cleanup)
      try {
        await authApi.post("/auth/logout");
      } catch (backendError) {
        // If backend logout fails, still proceed with frontend cleanup
        console.warn("Backend logout failed, proceeding with frontend cleanup");
      }

      // Clear tokens from cookies
      Cookies.remove("token", { path: "/" });
      Cookies.remove("cse_forums_refresh_token", { path: "/" });

      // Clear any other stored data if needed
      // localStorage.clear(); // Only if you use localStorage
      // sessionStorage.clear(); // Only if you use sessionStorage

      // Redirect to login or home page
      router.push("/auth/login");

      return { success: true };
    } catch (err) {
      const errorMessage = "Logout failed. Please try again.";
      setError(errorMessage);
      console.error("Logout error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error,
    clearError: () => setError(""),
  };
};
export const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserProfile = async (targetUserId = userId) => {
    if (!targetUserId) {
      setProfile(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/user/${targetUserId}`);
      console.log(response);
      if (response.data.success) {
        setProfile(response.data.data);
        return { success: true, data: response.data.data };
      } else {
        const errorMessage = response.data.message || 'Failed to fetch profile';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch profile';
      setError(errorMessage);
      console.error('Get profile error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updateData) => {
    if (!userId) {
      const errorMessage = 'User ID is required for profile update';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/user/${userId}`, updateData);

      if (response.data.success) {
        // Refresh profile data after successful update
        await getUserProfile(userId);
        return { success: true, data: response.data.data };
      } else {
        const errorMessage = response.data.message || 'Failed to update profile';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update profile';
      setError(errorMessage);
      console.error('Update profile error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile on hook initialization or when userId changes
  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    getUserProfile,
    updateProfile,
    refetch: () => getUserProfile(userId),
    clearError: () => setError(null),
  };
};

export default useAuth;
