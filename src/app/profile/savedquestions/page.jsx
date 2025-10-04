"use client";
import Link from "next/link";
import MySavedList from "../../../components/pages/profile/savedquestions/savedlist";
import Sidebar from "@/components/profile/sidebar";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import api from "@/lib/api";

// import the cusotm hooks
import useAuth from "@/hooks/Auth";
import { useGetUserSavedQuestions } from "@/hooks/Questions";

export default function Profil() {
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const { savedQuestions, loading, error, refetch } = useGetUserSavedQuestions();

  console.log("object", savedQuestions);
  return (
    <>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="w-full h-full bg-background-light">
        <div className="flex flex-col md:flex-row justify-center items-center sm:items-start gap-[48px] p-8 md:p-20">
          {/* Sidebar */}
          <Sidebar />

          {/* Navigation */}
          <div className="basis-3/4">
            <div className="flex  flex-col sm:flex-row justify-between gap-3 md:gap-6 mb-8">
              <Link
                href="/profile/myquestions"
                className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white"
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
                className="text-center w-full text-white py-1 md:py-2 md:px-6 text-lg bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white"
              >
                Saved Questions
              </Link>
            </div>

            <div>
              <MySavedList savedQuestions={savedQuestions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
