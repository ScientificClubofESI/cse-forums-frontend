"use client";
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Hero from "./landing/hero";
import Offers from "./landing/offers";
import About from "./landing/about";
import Feedback from "./landing/feedback";
import Footer from "./landing/footer";
import SignUp from "./auth/signup/page";
import LogIn from "./auth/login/page";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import Profil from "./profile/page";
import { useState , useEffect } from "react";

import AllQuestions from "./allquestions/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <Hero />
      <Offers />
      <About />
      <Feedback />
      <Footer />
    </div>
  );
}
