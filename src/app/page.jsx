"use client";
import Image from "next/image";
import Navbar from "@/components/navbar/navbarnotsignedin";
import Hero from "./landing/hero";
import Offers from "./landing/offers";
import About from "./landing/about";
import Feedback from "./landing/feedback";
import Footer from "./landing/footer";
import SignUp from "./auth/signup/page";
import LogIn from "./auth/login/page";
import  { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import Profil from "./profile/page"
import AllQuestions from "./allquestions/page";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";


export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    console.log("Token from cookies:", storedToken);
    setToken(storedToken);
  }, []);

  return (
    <div>
      <Hero />
      <Offers />
      <About />
      <Feedback />
      <Footer />
      
    </div>
  );
}
