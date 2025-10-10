"use client";
import Navbar from "@/components/navbar/navbarnotsignedin";
import Hero from "../components/pages/landing/hero";
import Offers from "../components/pages/landing/offers";
import About from "../components/pages/landing/about";
import Feedback from "../components/pages/landing/feedback";
import Footer from "../components/pages/landing/footer";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import { useState, useEffect } from "react";

// the auth hook
import useAuth from "@/hooks/Auth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="overflow-x-hidden">
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
