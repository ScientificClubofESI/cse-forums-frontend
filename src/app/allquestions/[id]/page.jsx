"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../hooks/Auth";
import {
  useQuestion,
  useSaveThread,
  useVoteThread,
  useDeleteThread,
  useUnvoteThread,
  useAuthenticatedQuestion,
} from "../../../hooks/Questions";
import {
  useAddAnswer,
  useGetAllAnswers,
  useApproveAnswer,
  useDisapproveAnswer,
  useLikeAnswer,
  useUnlikeAnswer,
  useDeleteAnswer,
  useCheckIfLiked,
} from "../../../hooks/Answers";
import {
  useGetAllReplies,
  useAddReply,
  useDeleteReply,
  useLikeReply,
  useUnlikeReply,
  useCheckIfLikedReply,
} from "../../../hooks/Replies";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import { common, createLowlight } from "lowlight";
import ImageComponent from "next/image";
import {
  GalleryImport,
  Code1,
  TextBold,
  TextUnderline,
  TextItalic,
  TextalignLeft,
  TextalignCenter,
  TextalignRight,
  Document,
  Send,
} from "iconsax-react";
import { TfiAlignLeft, TfiListOl, TfiAlignRight } from "react-icons/tfi";
import { Navbarsignedin } from "../../../components/navbar/navbarsignedin";
import Navbar from "@/components/navbar/navbar";
// Import icons
import BackIcon from "../../../../public/pages/questionPage/back.svg";
import ApprovedIcon from "../../../../public/pages/questionPage/approved.svg";
import ApproveIcon from "../../../../public/pages/questionPage/approve.svg";
import UpIcon from "../../../../public/pages/questionPage/up.svg";
import DownIcon from "../../../../public/pages/questionPage/down.svg";
import ShareIcon from "../../../../public/pages/questionPage/share.svg";
import SaveIcon from "../../../../public/pages/questionPage/save.svg";
import UserpicIcon from "../../../../public/pages/questionPage/userpic.svg";
import TrashIcon from "../../../../public/pages/questionPage/trash.svg";

const QuestionPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated } = useAuth();

  // Use custom hooks
  const {
    question: publicQuestion,
    loading: publicLoading,
    error: publicError,
    refetch: refetchPublic,
  } = useQuestion(params.id);
  const {
    question: authenticatedQuestion,
    loading: authLoading,
    error: authError,
    refetch: refetchAuth,
  } = useAuthenticatedQuestion(params.id);

  const { toggleSaveThread, loading: saveLoading } = useSaveThread();
  const { deleteThread, loading: deleteLoading } = useDeleteThread();
  const { voteThread, loading: voteLoading } = useVoteThread();
  const { unvoteThread, loading: unvoteLoading } = useUnvoteThread();

  const question = isAuthenticated ? authenticatedQuestion : publicQuestion;
  const loading = isAuthenticated ? authLoading : publicLoading;
  const error = isAuthenticated ? authError : publicError;
  const refetch = isAuthenticated ? refetchAuth : refetchPublic;

  // Answer hooks
  const { addAnswer, loading: addAnswerLoading } = useAddAnswer();
  const {
    answers: answersData,
    loading: answersLoading,
    refetch: refetchAnswers,
  } = useGetAllAnswers(params.id);
  const { approveAnswer } = useApproveAnswer();
  const { disapproveAnswer } = useDisapproveAnswer();
  const { likeAnswer } = useLikeAnswer();
  const { unlikeAnswer } = useUnlikeAnswer();
  const { deleteAnswer } = useDeleteAnswer();
  const { checkIfLiked } = useCheckIfLiked();

  const [answerLikes, setAnswerLikes] = useState({}); // Object: { answerId: boolean }
  const [answers, setAnswers] = useState([]);
  const [votes, setVotes] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showAnswerEditor, setShowAnswerEditor] = useState(false);
  const [iconSize, setIconSize] = useState(25);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const [showReplies, setShowReplies] = useState({});
  const [repliesData, setRepliesData] = useState({});

  const replyHooks = useRef({});

  useEffect(() => {
    if (question) {
      setVotes((question.upvotes || 0) - (question.downvotes || 0));
      setIsSaved(question.isSaved || false);
    }
  }, [question]);

  // Function to get or create reply hook for specific answer
  const getReplyHook = useCallback((answerId) => {
    if (!replyHooks.current[answerId]) {
      replyHooks.current[answerId] = {
        id: answerId,
        shouldFetch: false,
      };
    }
    return replyHooks.current[answerId];
  }, []);

  const handleShowReplies = useCallback(
    (answerId) => {
      if (showReplies[answerId]) {
        // Hide replies
        setShowReplies((prev) => ({ ...prev, [answerId]: false }));
      } else {
        // Show replies and trigger fetch
        setShowReplies((prev) => ({ ...prev, [answerId]: true }));

        // Mark this answer for fetching replies
        const replyHook = getReplyHook(answerId);
        replyHook.shouldFetch = true;

        // Store the answerId to fetch replies for
        setRepliesData((prev) => ({
          ...prev,
          [answerId]: { shouldFetch: true },
        }));
      }
    },
    [showReplies, getReplyHook]
  );

  // Check if the answer is liked for all answers
  useEffect(() => {
    const fetchAllLikeStatuses = async () => {
      if (isAuthenticated && user && answersData && answersData.length > 0) {
        const likeStatuses = {};

        // Check each answer individually
        for (const answer of answersData) {
          try {
            const isLiked = await checkIfLiked(params.id, answer.id);
            likeStatuses[answer.id] = isLiked;
          } catch (error) {
            console.error(
              `Error checking like status for answer ${answer.id}:`,
              error
            );
            likeStatuses[answer.id] = false;
          }
        }

        setAnswerLikes(likeStatuses);
      }
    };

    fetchAllLikeStatuses();
  }, [isAuthenticated, user?.id, answersData?.length, params.id]);

  // Update icon size on mount and window resize
  useEffect(() => {
    const updateIconSize = () => {
      setIconSize(window.innerWidth < 768 ? 20 : 25);
    };
    updateIconSize();
    window.addEventListener("resize", updateIconSize);
    return () => window.removeEventListener("resize", updateIconSize);
  }, []);

  // Editor configuration for answers - same as ask-question page
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItems = items.filter((item) => /image/.test(item.type));
        if (imageItems.length > 0) {
          event.preventDefault();
          imageItems.forEach((item) => {
            const file = item.getAsFile();
            if (file) {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                const { schema } = view.state;
                const node = schema.nodes.image.create({
                  src: fileReader.result,
                });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              };
            }
          });
          return true;
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files || []);
        const imageFiles = files.filter((file) => /image/.test(file.type));
        if (imageFiles.length > 0) {
          event.preventDefault();
          imageFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              const { schema } = view.state;
              const node = schema.nodes.image.create({
                src: fileReader.result,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            };
          });
          return true;
        }
        return false;
      },
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Write your answer here...",
        emptyEditorClass:
          "is-editor-empty first:before:block before:content-[attr(data-placeholder)] before:text-[#adb5bd] before:float-left before:h-0 before:pointer-events-none",
      }),
      Underline,
      Image.configure({
        inline: true,
      }),
      Dropcursor,
      TextAlign.configure({
        types: ["heading", "paragraph", "input"],
        defaultAlignment: "left",
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      Highlight,
    ],
  });

  // Custom image handler function - same as ask-question page
  const handleImageUpload = useCallback(
    (file) => {
      if (!file || !editor) return;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        editor.chain().focus().setImage({ src: fileReader.result }).run();
      };
    },
    [editor]
  );

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Insert an Image Link");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileInputClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileSelection = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (file.type.startsWith("image/")) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  const addCodeBlock = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  }, [editor]);

  useEffect(() => {
    if (question) {
      setVotes(question.votes || 0);
    }
  }, [question]);

  useEffect(() => {
    if (answersData) {
      setAnswers(answersData);
    }
  }, [answersData]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    try {
      const result = await toggleSaveThread(params.id, user.id, isSaved);
      if (result.success) {
        setIsSaved(!isSaved);
      }
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const handleEdit = () => {
    router.push(`/allquestions/${params.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteThread(params.id);
      if (result.success) {
        router.push("/allquestions");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  // Answer handlers
  const handleSubmitAnswer = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (!editor?.getHTML() || editor.getHTML().trim() === "<p></p>") {
      setErrorMessage("Please write an answer before submitting.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    try {
      const result = await addAnswer(params.id, editor.getHTML());
      if (result.success) {
        editor.commands.setContent("");
        setShowAnswerEditor(false);
        refetchAnswers(); // Refresh answers list
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  const handleApproveAnswer = async (answerId, isApproved) => {
    try {
      if (isApproved) {
        await disapproveAnswer(question.id, answerId);
      } else {
        await approveAnswer(question.id, answerId);
      }
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, isApproved: !isApproved }
            : answer
        )
      );
      refetchAnswers(); // Refresh answers list
    } catch (err) {
      console.error("Error updating answer approval:", err);
    }
  };

  const handleLikeAnswer = async (questionId, answerId) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    try {
      const result = await likeAnswer(questionId, answerId);
      if (result.success) {
        setAnswerLikes((prev) => ({
          ...prev,
          [answerId]: true,
        }));
        refetchAnswers(); // Refresh answers list
      }
    } catch (err) {
      console.error("Error liking answer:", err);
    }
  };

  const handleUnlikeAnswer = async (questionId, answerId) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    try {
      const result = await unlikeAnswer(questionId, answerId);
      if (result.success) {
        setAnswerLikes((prev) => ({
          ...prev,
          [answerId]: false,
        }));
        refetchAnswers(); // Refresh answers list
      }
    } catch (err) {
      console.error("Error unliking answer:", err);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!isAuthenticated) return;

    try {
      await deleteAnswer(answerId);
      refetchAnswers(); // Refresh answers list
    } catch (err) {
      console.error("Error deleting answer:", err);
    }
  };

  const handleVote = async (threadId, voteType, currentUserVote) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    try {
      let result;

      // If user already voted with the same type, remove the vote
      if (currentUserVote === voteType) {
        result = await unvoteThread(threadId);
        console.log("Vote removed");
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
        console.error("Failed to vote:", result.error);
        setErrorMessage("Failed to vote: " + result.error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Failed to vote:", error);
      setErrorMessage("An error occurred while voting.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleShareQuestion = async (questionId) => {
    try {
      const questionUrl = `${window.location.origin}/allquestions/${questionId}`;
      await navigator.clipboard.writeText(questionUrl);
      setSuccessMessage("Question link copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setErrorMessage("Failed to copy link to clipboard.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  console.log("Question data:", question);

  const isOwner =
    isAuthenticated && user && question && user.id === question.user_id;

  if (loading) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
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
        {/* Header */}
        <div className="font-semibold text-2xl text-neutral-900 self-start pb-8 flex items-center gap-4 md:text-[56px]">
          <button onClick={() => router.back()}>
            <ImageComponent
              src={BackIcon.src}
              alt="back"
              width={20}
              height={20}
              className="w-[25px] h-[25px] md:w-[48px] md:h-[48px]"
            />
          </button>
          Back to questions
        </div>
        {/* Question Card */}
        <div className="bg-white w-[23rem] md:w-[77rem] flex flex-col items-start font-medium text-xl md:font-semibold md:text-5xl py-8 rounded-lg p-6 gap-4">
          {/* Title and Votes */}
          <div className="cursor-pointer flex flex-row items-center justify-start gap-4 lg:gap-8">
            {/* Enhanced voting section with separate up/down buttons */}
            <div className="flex flex-col items-center gap-2">
              {/* Upvote button */}
              {isAuthenticated ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(question.id, "upvote", question?.userVote);
                  }}
                  disabled={voteLoading || unvoteLoading}
                  className={`p-1 rounded transition-colors ${
                    question?.hasUpvoted
                      ? "text-green-600 bg-green-100 hover:bg-green-200"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  } disabled:opacity-50`}
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/auth/login");
                  }}
                  className="p-1 rounded text-gray-600 hover:text-green-600"
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              )}

              {/* Vote count */}
              <div className="font-sans text-sm lg:text-2xl text-neutral-900 font-semibold">
                {(question?.upvotes || 0) - (question?.downvotes || 0)}
              </div>

              {/* Downvote button */}
              {isAuthenticated ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(question.id, "downvote", question?.userVote);
                  }}
                  disabled={voteLoading || unvoteLoading}
                  className={`p-1 rounded transition-colors ${
                    question?.hasDownvoted
                      ? "text-red-600 bg-red-100 hover:bg-red-200"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  } disabled:opacity-50`}
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/auth/login");
                  }}
                  className="p-1 rounded text-gray-600 hover:text-red-600"
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 rotate-180"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              )}
            </div>

            <div>
              <h1 className="text-sm lg:text-5xl font-sans text-neutral-900">
                {question?.title}
              </h1>
            </div>
          </div>
          {/* Posted Date */}
          <div className="flex w-full gap-4 px-8">
            <div className="flex-1 border-t border-neutral-300 md:border-neutral-100 mt-[0.5rem] w-[12.3rem] md:w-[59rem] md:mt-[0.9rem]"></div>
            <div className="flex-shrink-0 w-fit md:text-neutral-500 text-neutral-300 text-xs md:text-lg font-light font-serif">
              Posted {new Date(question?.date).toLocaleDateString()}
            </div>
          </div>
          {/* Content */}
          <div
            className="px-8 prose prose-sm max-w-none text-neutral-900 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question?.content }}
          />
          {/* Tags */}
          {question?.threads_tags && (
            <div className="bg-neutral-50 md:w-[71rem] w-[20rem] text-neutral-900 text-sm md:p-4 p-2 md:ml-[2rem] font-light md:text-base">
              {/* Tags: {question?.tags} iterate through the tags */}
              {question.threads_tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2"
                >
                  {tag.Tag.name}
                </span>
              ))}
            </div>
          )}
          <div className="border-t border-neutral-100 w-[20rem] md:w-[71rem] md:ml-[2rem]"></div>
          {/* Actions */}
          <div className="flex justify-between w-full items-center md:px-6">
            <div className="bg-primary-300 font-normal text-xs text-white rounded-lg md:text-xl md:w-[10rem] w-[5.625rem] h-[2rem] md:h-[3rem] flex items-center justify-center">
              {question?.answers_count || 0} Answers
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleShareQuestion(question.id)}
                className="flex items-center text-neutral-500 text-xs md:text-lg font-light gap-2 font-serif"
              >
                <ImageComponent
                  src={ShareIcon.src}
                  alt="share"
                  width={13.5}
                  height={13.5}
                  className="w-[13.5px] h-[13.5px] md:w-[24px] md:h-[24px]"
                />
                Share
              </button>
              <button
                onClick={handleSave}
                className="flex items-center text-neutral-500 text-xs md:text-lg font-light gap-2 font-serif"
              >
                <ImageComponent
                  src={SaveIcon.src}
                  alt="save"
                  width={13.5}
                  height={13.5}
                  className="w-[13.5px] h-[13.5px] md:w-[24px] md:h-[24px]"
                />
                {isSaved ? "Unsave" : "Save"}
              </button>
            </div>
          </div>
        </div>
        {/* Owner Actions */}
        {isOwner && (
          <div className=" w-[23rem] md:w-[77rem] flex justify-center items-center p-6 gap-6 ">
            <div className="w-full flex items-center justify-end gap-6">
              <button
                onClick={handleEdit}
                className="mt-[2rem] bg-primary-500 rounded-lg flex items-center justify-center text-white text-sm md:text-3xl font-semibold md:font-medium h-[2.375rem] md:h-[4rem] w-[9.063rem] md:w-[30.688rem]"
              >
                Edit question
              </button>
              <button
                onClick={handleDelete}
                className="mt-[2rem] bg-warning-500 rounded-lg flex items-center justify-center text-white text-sm md:text-3xl font-semibold md:font-medium h-[2.375rem] md:h-[4rem] w-[9.063rem] md:w-[30.688rem] gap-[4px]"
              >
                Delete question
                <ImageComponent
                  src={TrashIcon.src}
                  alt="delete"
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px] md:w-[32px] md:h-[32px]"
                />
              </button>
            </div>
          </div>
        )}

        {/* Answer Form for authenticated users */}
        {isAuthenticated && !isOwner && (
          <div className="md:w-[70rem] w-[18.875rem] mt-[2rem] ml-[4rem] md:ml-[7rem]">
            <div className="">
              {!showAnswerEditor ? (
                <button
                  onClick={() => setShowAnswerEditor(true)}
                  className="bg-secondary-500 w-full h-12 md:h-14 text-center font-sans text-white rounded-md flex items-center justify-center gap-2 md:gap-4 p-2 md:p-4 hover:bg-secondary-300 transition duration-300"
                >
                  + Drop an Answer
                </button>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-neutral-900">
                    Add Your Answer
                  </h3>

                  {/* Rich Text Editor Toolbar - Same as ask-question page */}
                  <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 mb-4">
                    <div className="flex flex-col items-center gap-1 mb-2">
                      <h3 className="font-serif font-bold text-sm md:text-base text-center">
                        Fonts
                      </h3>
                      <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                        <span
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                          className="cursor-pointer"
                        >
                          <TextBold color="#000000" size={iconSize} />
                        </span>
                        <span
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                          className="cursor-pointer"
                        >
                          <TextUnderline color="#000000" size={iconSize} />
                        </span>
                        <span
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                          className="cursor-pointer"
                        >
                          <TextItalic color="#000000" size={iconSize} />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 mb-2">
                      <h3 className="font-serif font-bold text-sm md:text-base text-center">
                        Alignment
                      </h3>
                      <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                        <span
                          onClick={() =>
                            editor?.chain().focus().setTextAlign("left").run()
                          }
                          className="cursor-pointer"
                        >
                          <TextalignLeft color="#000000" size={iconSize} />
                        </span>
                        <span
                          onClick={() =>
                            editor?.chain().focus().setTextAlign("center").run()
                          }
                          className="cursor-pointer"
                        >
                          <TextalignCenter color="#000000" size={iconSize} />
                        </span>
                        <span
                          onClick={() =>
                            editor?.chain().focus().setTextAlign("right").run()
                          }
                          className="cursor-pointer"
                        >
                          <TextalignRight color="#000000" size={iconSize} />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 mb-2">
                      <h3 className="font-serif font-bold text-sm md:text-base text-center">
                        Indenting/Lists
                      </h3>
                      <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                        <TfiAlignLeft
                          size={iconSize}
                          className="cursor-pointer"
                        />
                        <TfiAlignRight
                          size={iconSize}
                          className="cursor-pointer"
                        />
                        <span
                          onClick={() =>
                            editor?.chain().focus().toggleBulletList().run()
                          }
                          className="cursor-pointer"
                        >
                          <TfiListOl size={iconSize} />
                        </span>
                        <span
                          onClick={() =>
                            editor?.chain().focus().toggleOrderedList().run()
                          }
                          className="cursor-pointer"
                        >
                          <TfiListOl size={iconSize} />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 mb-2">
                      <h3 className="font-serif font-bold text-sm md:text-base text-center">
                        Inserts
                      </h3>
                      <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                        <button
                          onClick={handleFileInputClick}
                          className="bg-transparent border-0 p-0 cursor-pointer"
                        >
                          <Document color="#000000" size={iconSize} />
                          <input
                            onChange={handleFileSelection}
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </button>
                        <span onClick={addImage} className="cursor-pointer">
                          <GalleryImport color="#000000" size={iconSize} />
                        </span>
                        <span onClick={addCodeBlock} className="cursor-pointer">
                          <Code1 color="#000000" size={iconSize} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editor Content */}
                  <EditorContent
                    className="w-full h-64 md:h-96 rounded-md p-3 md:p-4 lg:p-6 bg-white resize-none focus:outline-none overflow-auto mb-4"
                    editor={editor}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={addAnswerLoading}
                      className="bg-secondary-500 text-white px-6 py-2 rounded-lg hover:bg-secondary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {addAnswerLoading ? "Submitting..." : "Submit Answer"}
                      <Send size={16} color="#d9e3f0" variant="Bold" />
                    </button>
                    <button
                      onClick={() => {
                        setShowAnswerEditor(false);
                        editor?.commands.clearContent();
                      }}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Answers Section */}
        <div className="md:w-[70rem] w-[18.875rem] mt-[2rem] ml-[4rem] md:ml-[7rem]">
          <div className="">
            {answers.length > 0 ? (
              <div className="flex flex-col gap-10">
                {answers.map((answer) => (
                  <AnswerWithReplies
                    key={answer.id}
                    answer={answer}
                    threadId={params.id}
                    isOwner={isOwner}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    answerLikes={answerLikes}
                    showReplies={showReplies}
                    onShowReplies={handleShowReplies}
                    onApproveAnswer={handleApproveAnswer}
                    onLikeAnswer={handleLikeAnswer}
                    onUnlikeAnswer={handleUnlikeAnswer}
                    onDeleteAnswer={handleDeleteAnswer}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No answers yet. Be the first to answer this question!
              </p>
            )}
          </div>
        </div>

        <div className="md:pb-[91px] pb-[2rem]"></div>
      </div>
    </div>
  );
};

const AnswerWithReplies = ({
  answer,
  threadId,
  isOwner,
  user,
  isAuthenticated,
  answerLikes,
  showReplies,
  onShowReplies,
  onApproveAnswer,
  onLikeAnswer,
  onUnlikeAnswer,
  onDeleteAnswer,
}) => {
  const {
    replies,
    loading: repliesLoading,
    error: repliesError,
    refetch: refetchReplies,
  } = useGetAllReplies(threadId, answer.id);

  const [showAnswerReplyForm, setShowAnswerReplyForm] = useState(false);
  const [answerReplyContent, setAnswerReplyContent] = useState("");

  const { addReply: addAnswerReply, loading: addAnswerReplyLoading } =
    useAddReply(threadId, answer.id, answerReplyContent, null);

  const answerReplyEditor = useEditor({
    content: "",
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Write your reply to this answer...",
        emptyEditorClass:
          "is-editor-empty first:before:block before:content-[attr(data-placeholder)] before:text-[#adb5bd] before:float-left before:h-0 before:pointer-events-none",
      }),
    ],
    onUpdate: ({ editor }) => {
      setAnswerReplyContent(editor.getHTML());
    },
  });

  const shouldShowReplies = showReplies[answer.id];

  const handleAddAnswerReply = async () => {
    if (
      !answerReplyContent ||
      answerReplyContent.trim() === "<p></p>" ||
      !answerReplyContent.trim()
    ) {
      setErrorMessage("Please write a reply before submitting.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    try {
      const result = await addAnswerReply();
      if (result.success) {
        // Clear the editor and hide form
        answerReplyEditor?.commands.clearContent();
        setAnswerReplyContent("");
        setShowAnswerReplyForm(false);
        refetchReplies(); // Refresh to show new reply
      } else {
        setErrorMessage("Failed to add reply: " + result.error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      setErrorMessage("An error occurred while adding the reply.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleCancelAnswerReply = () => {
    answerReplyEditor?.commands.clearContent();
    setAnswerReplyContent("");
    setShowAnswerReplyForm(false);
  };

  return (
    <div className="py-8 px-12 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-secondary-500 md:text-xl text-base font-medium flex items-center gap-2">
          <ImageComponent
            src={answer.User?.profile_picture || UserpicIcon.src}
            alt="user"
            width={27}
            height={27}
            className="w-[27px] h-[27px] md:w-[40px] md:h-[40px] rounded-full object-cover"
          />
          {answer.User?.username || "User"}
          <span className="text-sm text-gray-500 ml-2">
            {new Date(answer.date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Approval button */}
          {isOwner && (
            <button
              onClick={() => onApproveAnswer(answer.id, answer.isApproved)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                answer.isApproved
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ImageComponent
                src={answer.isApproved ? ApprovedIcon.src : ApproveIcon.src}
                alt={answer.isApproved ? "approved" : "approve"}
                width={16}
                height={16}
                className="w-4 h-4"
              />
              {answer.isApproved ? "Approved" : "Approve"}
            </button>
          )}

          {/* Show approved status for non-owners */}
          {!isOwner && answer.isApproved && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-100 text-green-700">
              <ImageComponent
                src={ApprovedIcon.src}
                alt="approved"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Approved
            </div>
          )}

          {/* Like button */}
          <button
            onClick={() => {
              const isLiked = answerLikes[answer.id];
              if (isLiked) {
                onUnlikeAnswer(threadId, answer.id);
              } else {
                onLikeAnswer(threadId, answer.id);
              }
            }}
            className={`flex items-center gap-1 transition-colors ${
              answerLikes[answer.id]
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            disabled={!isAuthenticated}
          >
            <ImageComponent
              src={UpIcon.src}
              alt="like"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-sm">{answer.likes_count || 0}</span>
          </button>

          {/* Delete button */}
          {isAuthenticated && (user?.id === answer.user_id || isOwner) && (
            <button
              onClick={() => onDeleteAnswer(answer.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <ImageComponent
                src={TrashIcon.src}
                alt="delete"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>
          )}
        </div>
      </div>

      {/* Answer content */}
      <div
        className="prose prose-sm max-w-none text-neutral-900 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: answer.content }}
      />

      {isAuthenticated && (
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setShowAnswerReplyForm(!showAnswerReplyForm)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showAnswerReplyForm ? "Cancel Reply" : "↳ Reply to this answer"}
          </button>
        </div>
      )}

      {showAnswerReplyForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-2">
            <span className="text-sm text-gray-600">
              Replying to {answer.user?.username || "User"}'s answer
            </span>
          </div>

          <EditorContent
            className="w-full min-h-[100px] rounded-md p-3 bg-white border border-gray-200 resize-none outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mb-3 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
            editor={answerReplyEditor}
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddAnswerReply}
              disabled={addAnswerReplyLoading}
              className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addAnswerReplyLoading ? "Submitting..." : "Submit Reply"}
            </button>
            <button
              onClick={handleCancelAnswerReply}
              className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Show Replies Section */}
      <div className="mt-4 border-t pt-4">
        <button
          onClick={() => onShowReplies(answer.id)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          disabled={repliesLoading}
        >
          {repliesLoading ? (
            <span>Loading replies...</span>
          ) : (
            <>
              <span>
                {shouldShowReplies ? "Hide" : "Show"} replies
                {replies && replies.length > 0 && ` (${replies.length})`}
              </span>
              <span
                className={`transition-transform ${
                  shouldShowReplies ? "rotate-90" : ""
                }`}
              >
                →
              </span>
            </>
          )}
        </button>

        {/* Display replies when shown */}
        {shouldShowReplies && (
          <div className="mt-4">
            {repliesError ? (
              <p className="text-red-500 text-sm">
                Error loading replies: {repliesError}
              </p>
            ) : replies && replies.length > 0 ? (
              <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                {replies.map((reply) => (
                  <ReplyComponent
                    key={reply.id}
                    reply={reply}
                    threadId={threadId}
                    answerId={answer.id}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    onRefetch={refetchReplies}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic pl-4">
                No replies yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Reply component using proper hooks
const ReplyComponent = ({
  reply,
  threadId,
  answerId,
  user,
  isAuthenticated,
  onRefetch,
  depth = 0,
}) => {
  // Use proper reply hooks
  const { deleteReply, loading: deleteLoading } = useDeleteReply(
    threadId,
    answerId,
    reply.id
  );
  const { likeReply, loading: likeLoading } = useLikeReply(
    threadId,
    answerId,
    reply.id
  );
  const { unlikeReply, loading: unlikeLoading } = useUnlikeReply(
    threadId,
    answerId,
    reply.id
  );

  const { checkIfLikedReply } = useCheckIfLikedReply(
    threadId,
    answerId,
    reply.id
  );

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const { addReply, loading: addReplyLoading } = useAddReply(
    threadId,
    answerId,
    replyContent,
    reply.id
  );

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (isAuthenticated && user) {
        try {
          const isLikedResult = await checkIfLikedReply();
          if (isLikedResult !== undefined) {
            setIsLiked(isLikedResult);
          }
        } catch (error) {
          console.error("Error checking reply like status:", error);
        }
      }
    };

    checkLikeStatus();
  }, [isAuthenticated, user, threadId, answerId, reply.id]);

  const replyEditor = useEditor({
    content: "",
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Write your reply...",
        emptyEditorClass:
          "is-editor-empty first:before:block before:content-[attr(data-placeholder)] before:text-[#adb5bd] before:float-left before:h-0 before:pointer-events-none",
      }),
    ],
    onUpdate: ({ editor }) => {
      setReplyContent(editor.getHTML());
    },
  });

  const handleDeleteReply = async () => {
    if (confirm("Are you sure you want to delete this reply?")) {
      const result = await deleteReply();
      if (result.success) {
        onRefetch(); // Refresh replies after deletion
      }
    }
  };

  const handleLikeReply = async () => {
    try {
      if (isLiked) {
        const result = await unlikeReply();
        if (result.success) {
          setIsLiked(false);
          onRefetch();
        }
      } else {
        const result = await likeReply();
        if (result.success) {
          setIsLiked(true);
          onRefetch();
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleUnlikeReply = async () => {
    const result = await unlikeReply();
    if (result.success) {
      onRefetch(); // Refresh to show updated like count
    }
  };

  const handleAddReply = async () => {
    if (
      !replyContent ||
      replyContent.trim() === "<p></p>" ||
      !replyContent.trim()
    ) {
      setErrorMessage("Please write a reply before submitting.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    try {
      const result = await addReply();
      if (result.success) {
        // Clear the editor and hide form
        replyEditor?.commands.clearContent();
        setReplyContent("");
        setShowReplyForm(false);
        onRefetch(); // Refresh to show new reply
      } else {
        setErrorMessage("Failed to add reply: " + result.error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      setErrorMessage("An error occurred while adding the reply.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleCancelReply = () => {
    replyEditor?.commands.clearContent();
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div
      className="p-3 bg-gray-50 rounded-lg"
      style={{ marginLeft: `${depth * 20}px` }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-700">
            {reply.user?.username || "User"}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(reply.date).toLocaleDateString()}
          </span>
          <span className="text-xs text-gray-400">
            {reply.likes_count || 0} likes
          </span>
        </div>

        {/* Reply actions */}
        <div className="flex items-center gap-2">
          {/* Like button */}
          <button
            onClick={handleLikeReply}
            disabled={!isAuthenticated || likeLoading || unlikeLoading}
            className={`flex items-center gap-1 transition-colors ${
              isLiked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <ImageComponent
              src={UpIcon.src}
              alt="like"
              width={14}
              height={14}
              className="w-[14px] h-[14px]"
            />
            <span className="text-xs">{reply.likes_count || 0}</span>
          </button>
          {/* Delete button for reply owner */}
          {isAuthenticated && user?.id === reply.user_id && (
            <button
              onClick={handleDeleteReply}
              disabled={deleteLoading}
              className="text-xs text-red-600 hover:text-red-800 disabled:opacity-50"
            ></button>
          )}
        </div>
      </div>
      <div
        className="text-sm text-gray-800 mb-2 prose prose-xs max-w-none"
        dangerouslySetInnerHTML={{ __html: reply.content }}
      />

      {isAuthenticated &&
        depth < 3 && ( // Limit nesting to 3 levels
          <div className="flex items-center gap-3 mt-2 mb-3">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showReplyForm ? "Cancel Reply" : "↳ Reply"}
            </button>
          </div>
        )}

      {showReplyForm && (
        <div className="mt-3 mb-3 p-3 bg-white rounded-lg border border-gray-200">
          <div className="mb-2">
            <span className="text-xs text-gray-500">
              Replying to {reply.user?.username || "User"}
            </span>
          </div>

          {/* Simple Editor for Replies */}
          <EditorContent
            className="w-full min-h-[80px] rounded-md p-2 bg-gray-50 border border-gray-200 resize-none outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mb-3 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none"
            editor={replyEditor}
          />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddReply}
              disabled={addReplyLoading}
              className="bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addReplyLoading ? "Submitting..." : "Submit Reply"}
            </button>
            <button
              onClick={handleCancelReply}
              className="bg-gray-400 text-white px-3 py-1 rounded text-xs hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display nested replies if they exist */}
      {reply.children && reply.children.length > 0 && (
        <div className="mt-2 space-y-2">
          {reply.children.map((childReply) => (
            <ReplyComponent
              key={childReply.id}
              reply={childReply}
              threadId={threadId}
              answerId={answerId}
              user={user}
              isAuthenticated={isAuthenticated}
              onRefetch={onRefetch}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default QuestionPage;
