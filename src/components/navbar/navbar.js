"use client";
import { useState, useEffect } from "react";
import NavbarSignedIn from "./navbarsignedin";
import NavbarSignedOut from "./navbarnotsignedin";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to avoid mismatch
  
    useEffect(() => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    }, []);
  
    if (isAuthenticated === null) return null; // Prevent mismatch during hydration
  
    return isAuthenticated ? <NavbarSignedIn /> : <NavbarSignedOut />;
  };
  
  export default Navbar;
