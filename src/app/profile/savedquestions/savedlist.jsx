"use client";
import { useState } from "react";
import Image from "next/image";
import Card from "./card";
// import cardData from "./cardData";
import empty from "../../../../public/emtyProfil.png";
import Link from "next/link";

export const SavedQuestions = ({savedQuestions}) => {
  const [activeTab, setActiveTab] = useState("Recent"); // Track active tab
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = savedQuestions.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(savedQuestions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Add filtering logic for cardData based on selected tab
  };

  const handleEdit = () => {
    alert("Edit clicked!");
  };

  const handleDelete = () => {
    alert("Delete clicked!");
  };

  return (
    <div className="flex flex-col gap-[48px]">
      {/* Tabs */}
      <div className="flex flex-row gap-[7px] md:gap-[14px]">
        {["Recent", "Most Rated", "Recently Answered", "Most Answered"].map((tab) => (
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
        ))}
      </div>

      {/* Content */}
      {currentCards.length === 0 ? (
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <Image src={empty} alt="No data available" width={400} height={400} />
          <div className="text-center text-neutral-900 text-xl md:text-2xl font-oswald">
            No Question saved Yet
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCards.map((card, index) => (
            <Card
              key={index}
              title={card.Thread.title}
              content={card.Thread.content}
              answersCount={card.Thread.answers_count}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Ask Question Button */}
      <Link href="/ask-question">
      <button className="py-[12px] px-[40px] bg-secondary-500 text-white font-oswald rounded-[8px] text-center">
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

export default SavedQuestions;

