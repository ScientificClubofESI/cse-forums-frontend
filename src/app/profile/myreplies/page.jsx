"use client";
import Link from "next/link";
import MyRepliesList from "../../../components/pages/profile/myreplies/replieslist";
import Sidebar from "@/components/profile/sidebar";
import Navbar from "@/components/navbar/navbar";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import { useState, useEffect } from "react";
import api from "@/lib/api";

// import the auth hook
import useAuth from "@/hooks/Auth";
import { useUserAnswers } from "@/hooks/Questions";

export default function Profil() {
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const { answers, loading, error } = useUserAnswers(userId);

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
                className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white"
              >
                My Questions
              </Link>
              <Link
                href="/profile/myreplies"
                className="text-center w-full text-white py-1 md:py-2 md:px-6 text-lg bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white"
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
              <MyRepliesList answers={answers} /> {/* Pass Answers as a prop */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
