"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Card from "./card";
// import cardData from "./cardData";
import empty from "../../../../public/emtyProfil.png";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie"; // If using authentication

export const MyQuestionsList = ({ myQuestions,setmyquestions, }) => {
  const [activeTab, setActiveTab] = useState("Recent"); // State for active tab
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = myQuestions.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(myQuestions.length / itemsPerPage);

  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Add logic to fetch data for the selected tab if needed
  };

  

  return (
    <div className="flex flex-col gap-[48px]">
      {/* Tabs */}
      <div className="flex flex-row gap-[7px] md:gap-[14px]">
        {["Recent", "Most Rated", "Recently Answered", "Most Answered"].map(
          (tab) => (
            <div
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`py-[4px] md:py-[8px] px-[8px] md:px-[16px] text-center cursor-pointer font-oswald ${
                activeTab === tab
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
      {myQuestions.length === 0 ? (
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <Image src={empty} alt="No data available" width={400} height={400} />
          <div className="text-center text-neutral-900 text-xl md:text-2xl font-oswald">
            No Question Posted Yet
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
            {currentCards.map((card, index) => (
              <div
                key={index}
                className="flex-grow sm:flex-grow-0"
              >
                <Card
                  id={card.id} // Pass thread ID
                  title={card.title}
                  content={card.content}
                  // newAnswersCount={card.newAnswersCount}
                  // answersCount={card.answers_count}
                  onEdit={() => alert("Edit clicked!")}
                  onDelete={() => alert("Delete clicked!")} // Pass delete function
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask Question Button */}
      <Link href="/ask-question" className="w-full flex justify-center">
        <button className="w-full text-2xl py-[12px] px-[40px] bg-secondary-500 text-white font-oswald rounded-[8px] text-center">
          Ask a new Question?
        </button>
      </Link>

      {/* Pagination */}
      <div className="flex justify-center gap-[10px] mt-[20px]">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-md ${
              currentPage === index + 1
                ? "bg-secondary-500 text-white"
                : "bg-neutral-200 text-neutral-900"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyQuestionsList;
