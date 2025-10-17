"use client";
import Link from "next/link";
import MyquestionsList from "../../../components/pages/profile/myquestions/questionslist";
import Sidebar from "@/components/profile/sidebar";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";

// import the auth hook
import useAuth from "@/hooks/Auth";
import { useGetMyQuestions, useDeleteThread } from "@/hooks/Questions";

export default function Myquestions() {
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const { questions: myquestions, loading: questionsLoading, error: questionsError, refetch } = useGetMyQuestions();
  const { deleteThread, loading: deleteLoading, error: deleteError } = useDeleteThread();


  const handleDeleteThread = async (id) => {
    const results = await deleteThread(id);
    if (results.success) {
      console.log("Thread deleted successfully");
      refetch();
    } else {
      console.log("Failed to delete thread: " + results.error);
    }
  }

  return (
    <>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="min-h-screen w-full h-full bg-background-light">
        <div className="flex flex-col md:flex-row justify-center items-center sm:items-start gap-[48px] p-8 md:p-20">
          {/* Sidebar */}
          <Sidebar />

          {/* Navigation */}
          <div className="basis-3/4">
            <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-6 mb-8">
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
            {/* Error State */}
            {questionsError && !questionsLoading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">
                <p className="text-red-700">Failed to load questions: {questionsError}</p>
              </div>
            )}

            {/* Delete Error State */}
            {deleteError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">
                <p className="text-red-700">Failed to delete: {deleteError}</p>
              </div>
            )}

            <div>
              <MyquestionsList
                myQuestions={myquestions}
                onDelete={(id) => handleDeleteThread(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
