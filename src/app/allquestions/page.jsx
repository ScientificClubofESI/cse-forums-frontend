"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import filtre from "./../../../public/allQuestion/filtre.svg";
import left from "./../../../public/allQuestion/left.svg";
import right from "./../../../public/allQuestion/right.svg";
import dotes from "./../../../public/allQuestion/dotes.svg";
import UpDown from "./../../../public/allQuestion/UpDown.svg";
import plus from "./../../../public/allQuestion/addAnswer.svg";
import save from "./../../../public/allQuestion/save.svg";
import share from "./../../../public/allQuestion/share.svg";



import {questions} from "./export.js";


export const AllQuestions = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(10);

{/*  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, questions.length);
  const displayedQuestions = questions.slice(startIndex, endIndex);*/}
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  

  return (
    <div className="w-screen bg-neutral-50">
      <div className="flex flex-col justify-between items-center gap-8 py-10 px-8 lg:px-32">
        <div className="flex flex-col justify-between items-center gap-8 w-full">
          <div className="flex flex-row justify-between items-center gap-4 lg:gap-8 w-full">
            <h1 className="text-2xl lg:text-5xl text-neutral-900 font-sans">
              All Questions
            </h1>
            <Link
              href="/questionPage/asker"
              className="bg-secondary-500 rounded-md lg:rounded-lg py-2 px-4 lg:px-12 text-[#FFF] font-sans text-sm lg:text-3xl"
            >
              Ask a Question ?
            </Link>
          </div>

          <div className="flex flex-row justify-between items-center gap-4 lg:gap-8 w-full">
            <div className="flex flex-row justify-between items-start gap-2 lg:gap-4 font-sans text-xs lg:text-xl text-neutral-900 ">
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 ${
                  activeFilter === "all"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100"
                }`}
                onClick={() => handleFilterChange("all")}
              >
                All
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 ${
                  activeFilter === "Popular"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100"
                }`}
                onClick={() => handleFilterChange("Popular")}
              >
                Popular
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 ${
                  activeFilter === "Newest"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100"
                }`}
                onClick={() => handleFilterChange("Newest")}
              >
                Newest
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 ${
                  activeFilter === "Most Answered"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100"
                }`}
                onClick={() => handleFilterChange("Most Answered")}
              >
                Most Answered
              </Link>
            </div>

            <div className="flex justify-between items-center rounded-md bg-primary-500 py-1 px-2 lg:px-4">
              <Link
                className="text-xl text-[#FFF] flex items-center"
                href="#"
              >
                <Image
                  src={filtre}
                  alt="Filtre icon"
                  className="p-1 lg:mr-2 lg:w-8 w-5"
                />
                <span className="hidden sm:inline">Filter</span>
              </Link>
            </div>
          </div>

          {/*white card */}
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col justify-between items-start gap-4 bg-[#FFF] px-8 py-4 rounded-lg">
              <div className="flex flex-row items-center justify-start gap-4 lg:gap-8">
                <div className="flex flex-row items-center justify-between gap-1"> 
                    <Image src={UpDown} alt="Lines" className="h-full w-4 lg:w-8" />
                    <div className="font-sans text-sm lg:text-3xl text-neutral-900"> 64 </div>
                </div>    
                <h1 className="text-sm lg:text-5xl font-sans text-neutral-900">{question.question}</h1>
              </div>

              <div className="w-full flex flex-row justify-between items-center gap-0">
                <div className="lg:w-3/4 w-1/2 h-[0.1px] bg-neutral-300 rounded-full"></div> 
                <div className="font-serif lg:text-lg text-xs text-neutral-300">Posted less than 1 day</div>
              </div>  

              <div className="text-neutral-500 font-serif text-sm lg:text-2xl">
                  <p>{question.details}</p>
              </div>


              <div className="w-full flex flex-row justify-between items-center gap-6">
                {/*drop answer + number of answer buttons */}  
                <div className="flex flex-row justify-between items-center gap-3 lg:gap-4">
                  <Link 
                    href="/" 
                    className="flex items-center bg-secondary-500 rounded-md lg:rounded-lg p-1 lg:py-2 lg:px-4 text-[#FFF] font-sans text-sm lg:text-xl"
                  >
                    <Image
                      src={plus}
                      alt="Add answer"
                      className="lg:p-1 w-5"
                    />
                    <span>Drop an Answer</span>
                  </Link>

                  <Link 
                    href="/" 
                    className="bg-primary-300 rounded-md lg:rounded-lg py-1 px-2 lg:py-2 lg:px-4 text-[#FFF] font-sans text-sm lg:text-xl"
                  >
                    {question.responses} answer
                  </Link>
                </div>

                {/* buttons of share and save */}
                <div className="flex flex-row items-end justify-end gap-4">
                  {/*share button */}
                  <Link
                    className="text-xs lg:text-lg text-neutral-500 font-serif flex items-center  gap-1 lg:gap-2"
                    href="#"
                  >
                    <Image
                      src={share}
                      alt="share icon"
                      className="w-[13px] lg:w-[24px] "
                    />
                     Share
                  </Link>

                   {/*save button */}
                  <Link
                    className="text-xs lg:text-lg text-neutral-500 font-serif flex items-center gap-1 lg:gap-2"
                    href="#"
                  >
                    <Image
                      src={save}
                      alt="save icon"
                      className="w-[13px] lg:w-[24px]"
                    />
                     Save
                  </Link>

                </div>
              </div>

            </div>
          ))}
          
          {/*ask a question button */}
          <Link 
             className="w-full bg-secondary-500 font-sans text-xl lg:text-3xl rounded-lg text-[#FFF] text-center py-2"
             href="/questionPage/asker"
          >
             Ask a Question ?
          </Link>

          {/*Pages*/}
          <div className="flex flex-row justify-between items-center gap-4 lg:gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className="disabled:opacity-50"
            >
              <Image src={left} alt="left icon" width={24} height={24} />
            </button>
            <div className="flex items-center text-neutral-700">
              <Link href="/" className={`mr-2 ${currentPage === 1 && "bg-secondary-500 p-1 rounded-sm"}`}>{currentPage}</Link>
              <Link href="/" className="mr-2">{currentPage+1}</Link>
              <Link href="/" className="mr-2">{currentPage+2}</Link>
              <Link href="/" className="mr-2">{currentPage+3}</Link>
              <Link href="/" className="mr-2">{currentPage+5}</Link>
              <Image src={dotes} alt="dotes" width={28} className="mr-2"/>
              <span>{totalPages}</span>
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="disabled:opacity-100"
            >
              <Image src={right} alt="right icon" width={24} height={24}  />

            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
