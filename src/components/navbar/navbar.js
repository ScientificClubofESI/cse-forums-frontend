"use client";
import { useState, useEffect } from "react";
import NavbarSignedIn from "./navbarsignedin";
import NavbarSignedOut from "./navbarnotsignedin";
import Cookies from "js-cookie";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to avoid mismatch
  
    
      useEffect(() => {
        const storedToken = Cookies.get("token");
        console.log("Token from cookies:", storedToken);
        setIsAuthenticated(!!storedToken)
      }, []);
  
    if (isAuthenticated === null) return null; // Prevent mismatch during hydration
  
    return isAuthenticated ? <NavbarSignedIn /> : <NavbarSignedOut />;
  };
  
  export default Navbar;
