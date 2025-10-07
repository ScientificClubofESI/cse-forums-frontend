"use client";
import Navbar from "@/components/navbar/navbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import filtre from "./../../../public/pages/allQuestion/icons/filtre.svg";
import left from "./../../../public/pages/allQuestion/icons/left.svg";
import right from "./../../../public/pages/allQuestion/icons/right.svg";
import UpDown from "./../../../public/pages/allQuestion/icons/UpDown.svg";
import plus from "./../../../public/pages/allQuestion/icons/addAnswer.svg";
import save from "./../../../public/pages/allQuestion/icons/save.svg";
import saveblack from "./../../../public/pages/allQuestion/icons/save-black.svg";
import share from "./../../../public/pages/allQuestion/icons/share.svg";
import loop from "./../../../public/images/illustrations/Loop 6.svg";
import { useEffect } from "react";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import api from "@/lib/api";
import moment from "moment";
import PopUp from "../../components/PopUp/page";
import Search from "@/components/search/search";
import EmptySearchPage from "../searchquestion/emptysearchresult/page";
import { useRouter } from "next/navigation";

// import the cusotm hooks
import useAuth from "@/hooks/Auth";
import { useQuestions, useSaveThread, useSavedThreads } from "@/hooks/Questions";


export const AllQuestions = () => {

  // Hooks
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const { questions, loading: questionsLoading, error: questionsError, refetch } = useQuestions();
  const { toggleSaveThread, loading: saveLoading } = useSaveThread();
  const { savedThreads, loading: savedThreadsLoading, error: savedThreadsError, refetch: refetchSavedThreads } = useSavedThreads(userId);

  const router = useRouter();

  // Local state
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [threadId, setthreadId] = useState(0);

  // Pagination
  const itemsPerPage = 2;
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentThreads = questions.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  // Popup handlers
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Event handlers
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // TODO: Implement filtering logic
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

  const handleNavigation = (thread) => {
    router.push(`/allquestions/${thread.id}`);
  };

  const handleSaveThread = async (threadId) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    try {
      const isSaved = savedThreads.has(threadId);
      const result = await toggleSaveThread(threadId, userId, isSaved);

      if (result.success) {
        // Optionally show success message
        console.log(isSaved ? 'Thread unsaved' : 'Thread saved');
        // The savedThreads will be updated when the useSavedThreads hook refetches
        window.location.reload(); // Quick fix to refresh saved threads - can be improved
      } else {
        console.error('Failed to toggle save:', result.error);
      }
    } catch (error) {
      console.error('Failed to save thread:', error);
    }
  };

  const handleAddAnswer = (questionId) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    openPopup();
    setthreadId(questionId);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 min-h-screen">
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="flex flex-col justify-between items-center gap-8 py-10 px-8 lg:px-32">
        <div className="flex flex-col justify-between items-center gap-8 w-full mt-6">
          <div className="flex flex-row justify-between items-center gap-4 lg:gap-8 w-full relative">
            <h1 className="text-2xl lg:text-5xl text-neutral-900 font-sans font-semibold">
              All Questions
            </h1>
            <Link
              href="/ask-question"
              className="bg-secondary-500 rounded-md lg:rounded-lg py-2 px-4 lg:px-12 text-[#FFF] font-sans text-sm lg:text-3xl"
            >
              Ask a Question ?
            </Link>
            <Image src={loop} alt="all-questions" width={220} height={220} className="absolute left-14 md:block hidden" />
          </div>
          {/* this should be removed in the all questions page */}
          {/* <Search setthreads={setthreads} setCurrentPage={setCurrentPage} /> */}

          <div className="flex flex-row justify-between items-center gap-4 lg:gap-8 w-full mt-14">
            <div className="flex flex-row justify-between items-start gap-2 lg:gap-4 font-sans text-xs lg:text-xl text-neutral-900 ">
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 font-medium ${activeFilter === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("all")}
              >
                All
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 font-medium ${activeFilter === "Popular"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("Popular")}
              >
                Popular
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 font-medium ${activeFilter === "Newest"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("Newest")}
              >
                Newest
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4  font-medium ${activeFilter === "Most Answered"
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

          {/* Loading state */}
          {questionsLoading && (
            <div className="text-center py-8">
              <div className="text-lg">Loading questions...</div>
            </div>
          )}

          {/* Error state */}
          {questionsError && (
            <div className="text-center py-8 text-red-600">
              <div>Error: {questionsError}</div>
              <button
                onClick={refetch}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          )}


          {/* Questions list */}
          {!questionsLoading && !questionsError && (
            <>
              {questions.length === 0 ? (
                <EmptySearchPage />
              ) : (
                currentThreads?.map((question, index) => (
                  <div
                    key={question.id || index}
                    className="flex flex-col justify-between items-start gap-4 bg-[#FFF] px-8 py-4 rounded-lg w-full"
                  >
                    <div
                      className="cursor-pointer flex flex-row items-center justify-start gap-4 lg:gap-8"
                      onClick={() => handleNavigation(question)}
                    >
                      <div className="flex flex-row items-center justify-between gap-1">
                        <Image
                          src={UpDown}
                          alt="Lines"
                          className="h-full w-4 lg:w-8"
                        />
                        <div className="font-sans text-sm lg:text-3xl text-neutral-900">
                          {question.upvotes || 0}
                        </div>
                      </div>
                      <h1 className="text-sm lg:text-5xl font-sans text-neutral-900">
                        {question.title}
                      </h1>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-2">
                      <div className="flex-1 w-full h-[0.1px] bg-neutral-300 rounded-full"></div>
                      <div className="flex-shrink-0 w-fit font-serif lg:text-lg text-xs text-neutral-300">
                        {moment(question.date).format("MMMM D, YYYY")}
                      </div>
                    </div>

                    <div className="text-neutral-500 font-serif text-sm lg:text-2xl">
                      <p>{question.content}</p>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-6">
                      {/* Drop answer + number of answer buttons */}
                      <div className="flex flex-row justify-between items-center gap-3 lg:gap-4">
                        <button
                          onClick={() => handleAddAnswer(question.id)}
                          className="flex items-center bg-secondary-500 rounded-md lg:rounded-lg p-1 lg:py-2 lg:px-4 text-[#FFF] font-sans text-sm lg:text-xl"
                        >
                          <Image
                            src={plus}
                            alt="Add answer"
                            className="lg:p-1 w-5"
                          />
                          <span>Drop an Answer</span>
                        </button>

                        <div
                          className="bg-primary-300 rounded-md lg:rounded-lg py-1 px-2 lg:py-2 lg:px-4 text-[#FFF] font-sans text-sm lg:text-xl"
                        >
                          {question.answers_count || 0} answer
                        </div>
                      </div>

                      {/* Share and Save buttons */}
                      <div className="flex flex-row items-end justify-end gap-4">
                        {/* Share button */}
                        <button className="text-xs lg:text-lg text-neutral-500 font-serif flex items-center gap-1 lg:gap-2">
                          <Image
                            src={share}
                            alt="share icon"
                            className="w-[13px] lg:w-[24px]"
                          />
                          Share
                        </button>

                        {/* Save button */}
                        <button
                          className="text-xs lg:text-lg text-neutral-500 font-serif flex items-center gap-1 lg:gap-2"
                          onClick={() => handleSaveThread(question.id)}
                          disabled={saveLoading}
                        >
                          <Image
                            src={save}
                            alt="save icon"
                            className="w-[13px] lg:w-[24px]"
                          />
                          {saveLoading ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* Popup */}
          {isPopupOpen && (
            <PopUp
              isOpen={isPopupOpen}
              onClose={closePopup}
              threadId={threadId}
            />
          )}

          {/* Ask question button */}
          <Link
            className="w-full bg-secondary-500 font-sans text-xl lg:text-3xl rounded-lg text-[#FFF] text-center py-2"
            href="/ask-question"
          >
            Ask a Question ?
          </Link>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-row justify-between items-center gap-4 lg:gap-2">
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className="disabled:opacity-50"
              >
                <Image src={left} alt="left icon" width={24} height={24} />
              </button>
              <div className="flex gap-2 items-center text-neutral-700">
                {[...Array(totalPages)].map((_, index) => (
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
              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className="disabled:opacity-50"
              >
                <Image src={right} alt="right icon" width={24} height={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
