import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Custom hook for authentication
const useAuth = () => {
  // state for the user informations
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  // Function to read JWT token and extract user info
   const getUserFromToken = (token) => {
    try {
      const payloadPart = token.split('.')[1];
      const decodedPayload = atob(payloadPart);
      const userInfo = JSON.parse(decodedPayload);
      return userInfo;
    } catch (error) {
      console.log('Could not read token:', error);
      return null;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    
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

export default useAuth;