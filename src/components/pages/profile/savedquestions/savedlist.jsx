"use client";
import { useState } from "react";
import Image from "next/image";
import Card from "./card";
// import cardData from "./cardData";
import empty from "../../../../../public/images/illustrations/emtyProfil.png";
import Link from "next/link";
import { useGetUserSavedQuestions } from "@/hooks/Questions";


export const SavedQuestions = ({ onRefresh }) => {

  const filterMap = {
    "Recent": "recent",
    "Most Rated": "most-rated",
    "Most Answered": "most-answered"
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Recent"); // Track active tab
  const [errorMessage, setErrorMessage] = useState("");

  const { savedQuestions, error, pagination } = useGetUserSavedQuestions(filterMap[activeTab], currentPage, 6);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };

  //console.log(currentCards)
  const handleDelete = async (threadId) => {
    // Refresh the list after successful deletion
    setCurrentPage(1); // Reset to first page
  };

  const handleError = (error) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  return (
    <div className="flex flex-col gap-[48px]">
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex flex-col md:flex-row justify-between md:justify-normal gap-[7px] md:gap-[14px]">
        {["Recent", "Most Rated", "Most Answered"].map(
          (tab) => (
            <div
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`w-full md:w-fit text-xs md:text-lg py-[4px] md:py-[8px] md:px-[16px] text-center cursor-pointer font-oswald ${activeTab === tab
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-900"
                }`}
            >
              {tab}
            </div>
          )
        )}
      </div>

      {/* Content */}
      {savedQuestions.length === 0 ? (
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <Image src={empty} alt="No data available" width={400} height={400} />
          <div className="text-center text-neutral-900 text-xl md:text-2xl font-oswald">
            No Question saved Yet
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedQuestions.map((card, index) => (
            <Card
              id={card.id}
              key={index}
              title={card.title}
              content={card.content}
              answersCount={card.answers_count}
              onDelete={handleDelete}
              onError={handleError}
            />
          ))}
        </div>
      )}

      {/* Ask Question Button */}
      <Link href="/ask-question" className="w-full flex justify-center">
        <button className="py-[12px] px-[40px] bg-secondary-500 text-white w-full text-2xl font-oswald rounded-[8px] text-center">
          Ask a new Question?
        </button>
      </Link>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-[10px] mt-[20px]">
          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-md ${currentPage === index + 1
                ? "bg-secondary-500 text-white"
                : "bg-neutral-200 text-neutral-900"
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQuestions;
