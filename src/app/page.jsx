"use client";
import Navbar from "@/components/navbar/navbarnotsignedin";
import Hero from "../components/pages/landing/hero";
import Offers from "../components/pages/landing/offers";
import About from "../components/pages/landing/about";
import Feedback from "../components/pages/landing/feedback";
import Footer from "../components/pages/landing/footer";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import { useState, useEffect } from "react";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsAuthenticated(true);
      }
    }
  }, []);
  return (
    <div>
      {/* <Question/> */}
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <Hero />
      <Offers />
      <About />
      <Feedback />
      <Footer />
    </div>
  );
}
