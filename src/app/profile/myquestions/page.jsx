"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../../public/Icon.png";
import MyquestionsList from "./questionslist";
import Sidebar from "@/components/profile/sidebar";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import axios from "axios";

export default function Myquestions() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myquestions, setmyquestions] = useState([]);
    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsAuthenticated(true);
      }
      const getMyQuestions = async () => {
        try {
          const response = await axios.get("http://localhost:5000/threads/all"); // a controller will be implementer in the backend soon enough
          console.log("threads from myquestions page : ", response.data.data);
          
          const filteredQuestions = response.data.data.filter((item) => item.user_id == userId);
          setmyquestions(filteredQuestions);
          console.log("myquestions : ", myquestions);
          
        } catch (error) {
          console.error(error);
        }
      };
      getMyQuestions();
    }, []);
  
  
  return (
    <>
    {isAuthenticated ? <Navbarsignedin/> : <Navbar/>}
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      
      {/* Sidebar */}
    <Sidebar/>

      {/* Navigation */}
      <div className="basis-3/4">
        <div className="flex flex-row gap-6 mb-8">
          <Link href="/profile/myquestions" className=" text-white py-2 px-6 bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white">
            My Questions
          </Link>
          <Link href="/profile/myreplies" className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white">
            My Answers
          </Link>
          <Link href="/profile/savedquestions" className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white">
            Saved Questions
          </Link>
        </div>

        <div>
        <MyquestionsList myQuestions={myquestions} />
        </div>
      </div>
    </div>
    </>
  );
}
