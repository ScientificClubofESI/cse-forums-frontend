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
import share from "./../../../public/pages/allQuestion/icons/share.svg";
import loop from "./../../../public/images/illustrations/Loop 6.svg";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import moment from "moment";
import PopUp from "../../components/PopUp/page";
import EmptySearchPage from "../searchquestion/emptysearchresult/page";
import { useRouter } from "next/navigation";
import { useAuthenticatedQuestions } from "@/hooks/Questions";

// import the cusotm hooks
import useAuth from "@/hooks/Auth";
import { useQuestions, useSaveThread, useGetUserSavedQuestions, useVoteThread, useUnvoteThread } from "@/hooks/Questions";


export const AllQuestions = () => {
  // Local state
  const [activeFilter, setActiveFilter] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [threadId, setthreadId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Hooks
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const { questions: publicQuestions, loading: publicLoading, error: publicError, refetch: refetchPublic, pagination: publicPagination } = useQuestions(activeFilter, currentPage, 10);
  const { questions: authQuestions, loading: questionsAuthLoading, error: authError, refetch: refetchAuth, pagination: authPagination } = useAuthenticatedQuestions(isAuthenticated, activeFilter, currentPage, 10);
  const { toggleSaveThread, loading: saveLoading } = useSaveThread();
  const { voteThread, loading: voteLoading } = useVoteThread();
  const { unvoteThread, loading: unvoteLoading } = useUnvoteThread();

  const questions = isAuthenticated ? authQuestions : publicQuestions;
  const questionsLoading = isAuthenticated ? questionsAuthLoading : publicLoading;
  const questionsError = isAuthenticated ? authError : publicError;
  const refetch = isAuthenticated ? refetchAuth : refetchPublic;

  const pagination = isAuthenticated ? authPagination : publicPagination;
  const totalPages = pagination?.totalPages || 1;


  const router = useRouter();



  // Popup handlers
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Event handlers
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
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

  const handleSaveThread = async (threadId, isSaved) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    try {
      const result = await toggleSaveThread(threadId, userId, isSaved);

      if (result.success) {
        refetch();
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

  const handleVote = async (threadId, voteType, currentUserVote) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    try {
      let result;

      // If user already voted with the same type, remove the vote
      if (currentUserVote === voteType) {
        result = await unvoteThread(threadId);
        console.log('Vote removed');
      } else {
        // delete the old vote if exists and add the new vote
        if (currentUserVote) {
          await unvoteThread(threadId);
        }
        result = await voteThread(threadId, voteType);
        console.log(`${voteType} vote recorded`);
      }
      if (result.success) {
        refetch();
        setErrorMessage("");
      } else {
        console.error('Failed to vote:', result.error);
        setErrorMessage('Failed to vote: ' + result.error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error('Failed to vote:', error);
      setErrorMessage('An error occurred while voting.');
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };


  const handleShareQuestion = async (questionId) => {
  try {
    const questionUrl = `${window.location.origin}/allquestions/${questionId}`;
    await navigator.clipboard.writeText(questionUrl);
    setSuccessMessage('Question link copied to clipboard!');
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    console.error('Failed to copy: ', err);
    setErrorMessage('Failed to copy link to clipboard.');
    setTimeout(() => setErrorMessage(""), 5000);
  }
};

  return (
    <div className=" bg-gray-100 min-h-screen">
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mx-8 lg:mx-32 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="mx-8 lg:mx-32 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errorMessage}
          </div>
        </div>
      )}
      
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
                className={`rounded-md py-1 px-2 lg:px-4 font-medium ${activeFilter === "recent"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("recent")}
              >
                All
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 font-medium ${activeFilter === "most-rated"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("most-rated")}
              >
                Popular
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4 font-medium ${activeFilter === "recent"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("recent")}
              >
                Newest
              </Link>
              <Link
                href="#"
                className={`rounded-md py-1 px-2 lg:px-4  font-medium ${activeFilter === "Most-Answered"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100"
                  }`}
                onClick={() => handleFilterChange("most-answered")}
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
                questions?.map((question, index) => (
                  <div
                    key={question.id || index}
                    className="flex flex-col justify-between items-start gap-4 bg-[#FFF] px-8 py-4 rounded-lg w-full"
                  >
                    <div className="cursor-pointer flex flex-row items-center justify-start gap-4 lg:gap-8">
                      {/* Enhanced voting section with separate up/down buttons */}
                      <div className="flex flex-col items-center gap-2">
                        {/* Upvote button */}
                        {isAuthenticated ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(question.id, 'upvote', question.userVote);
                            }}
                            disabled={voteLoading || unvoteLoading}
                            className={`p-1 rounded transition-colors ${question.hasUpvoted
                              ? 'text-green-600 bg-green-100 hover:bg-green-200'
                              : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                              } disabled:opacity-50`}
                          >
                            <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/auth/login');
                            }}
                            className="p-1 rounded text-gray-600 hover:text-green-600"
                          >
                            <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                            </svg>
                          </button>
                        )}

                        {/* Vote count */}
                        <div className="font-sans text-sm lg:text-2xl text-neutral-900 font-semibold">
                          {(question.upvotes || 0) - (question.downvotes || 0)}
                        </div>

                        {/* Downvote button */}
                        {isAuthenticated ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(question.id, 'downvote', question.userVote);
                            }}
                            disabled={voteLoading || unvoteLoading}
                            className={`p-1 rounded transition-colors ${question.hasDownvoted
                              ? 'text-red-600 bg-red-100 hover:bg-red-200'
                              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                              } disabled:opacity-50`}
                          >
                            <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/auth/login');
                            }}
                            className="p-1 rounded text-gray-600 hover:text-red-600"
                          >
                            <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div onClick={() => handleNavigation(question)}>
                        <h1 className="text-sm lg:text-5xl font-sans text-neutral-900">
                          {question.title}
                        </h1>
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-2">
                      <div className="flex-1 w-full h-[0.1px] bg-neutral-300 rounded-full"></div>
                      <div className="flex-shrink-0 w-fit font-serif lg:text-lg text-xs text-neutral-300">
                        {moment(question.date).format("MMMM D, YYYY")}
                      </div>
                    </div>

                    <div
                      className="text-neutral-600 font-light text-lg md:text-xl font-nunito prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: question.content }}
                    />

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
                        <button  onClick={() => handleShareQuestion(question.id)} className="text-xs lg:text-lg text-neutral-500 font-serif flex items-center gap-1 lg:gap-2">
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
                          onClick={() => handleSaveThread(question.id, question.isSaved)}
                          disabled={saveLoading}
                        >
                          <Image
                            src={save}
                            alt="save icon"
                            className="w-[13px] lg:w-[24px]"
                          />
                          {saveLoading ? 'Processing...' : (question.isSaved ? 'Unsave' : 'Save')}
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
