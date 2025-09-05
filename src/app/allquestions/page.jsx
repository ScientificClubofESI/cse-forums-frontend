"use client";
import Navbar from "@/components/navbar/navbar";
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
import saveblack from "./../../../public/allQuestion/save-black.svg";
import share from "./../../../public/allQuestion/share.svg";
import { useEffect } from "react";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import api from "@/lib/api";
import moment from "moment";
import PopUp from "../PopUp/page";
import Cookies from "js-cookie";
import Search from "@/components/search/search";
import EmptySearchPage from "../searchquestion/emptysearchresult/page";
import { useRouter } from "next/navigation";
import { questions } from "./export.js";

export const AllQuestions = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [threads, setthreads] = useState([]);
  const [savedThreads, setSavedThreads] = useState(new Set()); // Store saved thread IDs
  const [userId, setUserId] = useState(null);
  const itemsPerPage = 2;
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentThreads = threads.slice(indexOfFirstCard, indexOfLastCard);
  const router = useRouter();
  

  const totalPages = Math.ceil(threads.length / itemsPerPage);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [threadId, setthreadId] = useState(0);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  {
    /*  const startIndex = (currentPage - 1) * 4;
  const endIndex = Math.min(startIndex + 4, questions.length);
  const displayedQuestions = questions.slice(startIndex, endIndex);*/
  }

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }
}, []);

  useEffect(() => {
    if (userId) {
      setIsAuthenticated(true);
      getQuestions();
      getSavedQuestions(userId);  // Pass userId correctly
    }
  }, [userId]); // Add userId as a dependency
  

  const getSavedQuestions = async (userId) => {
    if (!userId) return;
    try {
      const response = await api.get(`/threads/saved?user=${userId}`);
      console.log("Fetched saved threads:", response.data.data); // Debugging log
      const savedThreadIds = new Set(response.data.data.map((thread) => thread.id));
      setSavedThreads(savedThreadIds);
      
    } catch (error) {
      console.error("Failed to fetch saved threads:", error);
    }
    };


  const getQuestions = async () => {
    try {
      const response = await api.get("/threads/all");
      console.log("threads : ", response.data);
      setthreads(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const toggleSaveThread = async (threadId) => {
    if (!userId) {
      alert("You must be logged in to save a thread.");
      return;
    }

    try {
      if (savedThreads.has(threadId)) {
        await api.delete(`/threads/${threadId}/save`, {
          data: { user_id: Number(userId) },
        });
        setSavedThreads((prev) => {
          const newSet = new Set(prev);
          newSet.delete(threadId);
          return newSet;
        });
      } else {
        await api.post(
          `/threads/${threadId}/save`,
          { user_id: Number(userId) }
        );
        setSavedThreads((prev) => new Set(prev).add(threadId));
      }
    } catch (error) {
      console.error("Failed to toggle save:", error);
    }
  };

  const handleSaveThread = async (threadId) => {
    try {
      if (!userId) {
        alert("You must be logged in to save a thread.");
        return;
      }

      const response = await api.post(
        `/threads/${threadId}/save`,
        {
          user_id: Number(userId), // Send the user_id in the request body
        }
      );

      console.log("Thread saved successfully:", response.data);
      alert("Thread saved successfully!"); // Show a success message
    } catch (error) {
      console.error("Failed to save thread:", error);
      alert("Failed to save thread. Please try again."); // Show an error message
    }
  };

  useEffect(() => {
    console.log("Saved Threads:", savedThreads);
  }, [savedThreads]);
  

  const handleNavigation = (thread) => {
    sessionStorage.setItem("selectedThread", JSON.stringify(thread));
    router.push(`/questionPage/${thread.user_id == userId ? "asker" : "viewer"}`);
  }
  return (
    <div className=" bg-neutral-50">
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="flex flex-col justify-between items-center gap-8 py-10 px-8 lg:px-32">
        <div className="flex flex-col justify-between items-center gap-8 w-full">
          <div className="flex flex-row justify-between items-center gap-4 lg:gap-8 w-full">
            <h1 className="text-2xl lg:text-5xl text-neutral-900 font-sans">
              All Questions
            </h1>
            <Link
              href="/ask-question"
              className="bg-secondary-500 rounded-md lg:rounded-lg py-2 px-4 lg:px-12 text-[#FFF] font-sans text-sm lg:text-3xl"
            >
              Ask a Question ?
            </Link>
          </div>
          <Search setthreads={setthreads} setCurrentPage={setCurrentPage} />

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
              <Link className="text-xl text-[#FFF] flex items-center" href="#">
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
          {threads.length == 0 ? (
            <EmptySearchPage />
          ) : (
            currentThreads?.map((question, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-start gap-4 bg-[#FFF] px-8 py-4 rounded-lg w-full"
              >
                <div className="cursor-pointer flex flex-row items-center justify-start gap-4 lg:gap-8" onClick={() => handleNavigation(question)}>
                  <div className="flex flex-row items-center justify-between gap-1">
                    <Image
                      src={UpDown}
                      alt="Lines"
                      className="h-full w-4 lg:w-8"
                    />
                    <div className="font-sans text-sm lg:text-3xl text-neutral-900">
                      {" "}
                      {question.upvotes}{" "}
                    </div>
                  </div>
                  <h1 className="text-sm lg:text-5xl font-sans text-neutral-900">
                    {question.title}
                  </h1>
                </div>

                <div className="w-full flex flex-row justify-between items-center gap-0">
                  <div className=" w-full h-[0.1px] bg-neutral-300 rounded-full"></div>
                  <div className="font-serif lg:text-lg text-xs text-neutral-300">
                    {moment(question.date).format("MMMM D, YYYY")}
                  </div>
                </div>

                <div className="text-neutral-500 font-serif text-sm lg:text-2xl">
                  <p>{question.content}</p>
                </div>

                <div className="w-full flex flex-row justify-between items-center gap-6">
                  {/*drop answer + number of answer buttons */}
                  <div className="flex flex-row justify-between items-center gap-3 lg:gap-4">
                    <button
                      onClick={() => {
                        openPopup();
                        setthreadId(question.id);
                      }}
                      className="flex items-center bg-secondary-500 rounded-md lg:rounded-lg p-1 lg:py-2 lg:px-4 text-[#FFF] font-sans text-sm lg:text-xl"
                    >
                      <Image
                        src={plus}
                        alt="Add answer"
                        className="lg:p-1 w-5"
                      />
                      <span>Drop an Answer</span>
                    </button>

                    <Link
                      href="/"
                      className="bg-primary-300 rounded-md lg:rounded-lg py-1 px-2 lg:py-2 lg:px-4 text-[#FFF] font-sans text-sm lg:text-xl"
                    >
                      {question.answers_count} answer
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
                    <button
                      className="text-xs lg:text-lg text-neutral-500 font-serif flex items-center gap-1 lg:gap-2"
                      // href="#"
                      onClick={() => toggleSaveThread(question.id)}
                    >
                      <Image
                        src={savedThreads.has(question.id) ? saveblack : save}
                        alt="save icon"
                        className="w-[13px] lg:w-[24px]"
                      />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {isPopupOpen && (
            <PopUp
              isOpen={isPopupOpen}
              onClose={closePopup}
              threadId={threadId}
              // onSubmit={async(content) => {

              //   closePopup(); // Close the popup after submission
              // }}
              getQuestions={getQuestions}
            />
          )}

          {/*ask a question button */}
          <Link
            className="w-full bg-secondary-500 font-sans text-xl lg:text-3xl rounded-lg text-[#FFF] text-center py-2"
            href="/ask-question"
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
              {/* <span>{totalPages}</span> */}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="disabled:opacity-100"
            >
              <Image src={right} alt="right icon" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
