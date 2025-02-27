"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../../public/Icon.png";
import MySavedList from "./savedlist";
import Sidebar from "@/components/profile/sidebar";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import axios from "axios";

export default function Profil() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedQuestions, setsavedQuestions] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
      getSavedQuestions(userId);
    }
  }, []);
  const getSavedQuestions = async (userId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:5000/threads/saved?user=${userId}`);
      console.log("threads from savedquestions page:", response.data.data);
      setsavedQuestions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      
      {/* Sidebar */}
      <Sidebar/>

      {/* Navigation */}
      <div className="basis-3/4">
        <div className="flex flex-row gap-6 mb-8">
          <Link href="/profile/myquestions" className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white">
            My Questions
          </Link>
          <Link href="/profile/myreplies" className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white">
            My Answers
          </Link>
          <Link href="/profile/savedquestions" className="text-white py-2 px-6 bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white">
            Saved Questions
          </Link>
        </div>

        <div>
        <MySavedList savedQuestions={savedQuestions} />
        </div>
      </div>
    </div>
    </>
  );
}
