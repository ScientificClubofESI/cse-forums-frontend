"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../../public/Icon.png";
import MyquestionsList from "./questionslist";
import Sidebar from "@/components/profile/sidebar";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import api from "@/lib/api";

export default function Myquestions() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myquestions, setmyquestions] = useState([]);
  useEffect(() => {
    let userId = null;
    if (typeof window !== "undefined") {
      userId = localStorage.getItem("userId");
    }
    if (userId) {
      setIsAuthenticated(true);
    }
    const getMyQuestions = async () => {
      try {
        const response = await api.get("/threads/all"); // a controller will be implementer in the backend soon enough
        console.log("threads from myquestions page : ", response.data.data);

        const filteredQuestions = response.data.data.filter(
          (item) => item.user_id == userId
        );
        setmyquestions(filteredQuestions);
        console.log("myquestions : ", myquestions);
      } catch (error) {
        console.error(error);
      }
    };
    getMyQuestions();
  }, []);

  const deleteThread = async (threadId, setmyquestions) => {
    if (!confirm("Are you sure you want to delete this thread?")) return;

    try {
      const response = await api.delete(`/thread/${threadId}`);

      if (response.status === 200) {
        alert("Thread deleted successfully!");
        setmyquestions((prevThreads) =>
          prevThreads.filter((thread) => thread.id !== threadId)
        );
      }
    } catch (error) {
      console.error("Error deleting thread:", error);
      alert("Failed to delete thread.");
    }
  };

  return (
    <>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="w-full h-full bg-background-light">
        <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] p-8 md:p-20">
          {/* Sidebar */}
          <Sidebar />

          {/* Navigation */}
          <div className="basis-3/4">
            <div className="flex flex-row justify-between gap-3 md:gap-6 mb-8">
              <Link
                href="/profile/myquestions"
                className="text-center w-full text-white py-1 md:py-2 md:px-6 text-lg bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white"
              >
                My Questions
              </Link>
              <Link
                href="/profile/myreplies"
                className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white"
              >
                My Answers
              </Link>
              <Link
                href="/profile/savedquestions"
                className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white"
              >
                Saved Questions
              </Link>
            </div>

            <div>
              <MyquestionsList
                myQuestions={myquestions}
                setmyquestions={setmyquestions}
                onDelete={(id) => deleteThread(id, setmyquestions)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
