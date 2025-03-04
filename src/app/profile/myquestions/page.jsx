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
<<<<<<< HEAD
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] p-8 md:p-20 bg-background-light">
      
      {/* Sidebar */}
      <div className="w-full md:basis-1/4 flex md:flex-col flex-row gap-x-4 md:gap-x-0 items-center text-center bg-white p-[32px] rounded-[4px] ">
        <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[80px] h-[80px] md:w-[100px] md:h-[100px] overflow-hidden">
          <Image src={user} alt="User profile image" width={100} height={100} />
        </div>
        <div className="mt-4 text-left md:text-center">
          <p className="text-xl md:text-2xl font-bold">Lorem Ipsum</p>
          <p className="text-base md:text-lg text-neutral-600">LoremIpsum@gmail.com</p>
          <Link href={"./settings"} className="md:hidden block mt-4 py-2 px-6 bg-secondary-500 text-white rounded w-fit ">Edit Profile</Link>
        </div>
        <Link href={"./settings"} className="hidden md:block mt-4 py-2 px-6 bg-secondary-500 text-white  rounded">Edit Profile</Link>
      </div>
=======
    <>
    {isAuthenticated ? <Navbarsignedin/> : <Navbar/>}
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      
      {/* Sidebar */}
    <Sidebar/>
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231

      {/* Navigation */}
      <div className="basis-3/4">
        <div className="flex flex-row justify-between gap-3 md:gap-6 mb-8">
          <Link href="/profile/myquestions" className="text-center w-full text-white py-1 md:py-2 md:px-6 text-lg bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white">
            My Questions
          </Link>
          <Link href="/profile/myreplies" className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white">
            My Answers
          </Link>
          <Link href="/profile/savedquestions" className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white">
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
