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
<<<<<<< HEAD
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
=======
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import Profil from "./profile/page";
import { useState , useEffect } from "react";
import Question from "./ask-question/page"
import PopUp from "./PopUp/page";

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
      {/* <Question/> */}
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
      <Hero />
      <Offers />
      <About />
      <Feedback />
      <Footer />
    </div>
  );
}
