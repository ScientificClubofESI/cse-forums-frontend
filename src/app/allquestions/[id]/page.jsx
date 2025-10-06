"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../hooks/Auth";
import { useQuestion, useSaveThread, useVoteThread, useDeleteThread } from "../../../hooks/Questions";
import { useAddAnswer, useGetAllAnswers, useApproveAnswer, useDisapproveAnswer, useLikeAnswer, useUnlikeAnswer, useDeleteAnswer, useCheckIfLiked } from "../../../hooks/Answers";
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
import ApprovedIcon from "../../../../public/pages/questionPage/Approved.svg";
import ApproveIcon from "../../../../public/pages/questionPage/Approve.svg";
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
    const { question, loading, error } = useQuestion(params.id);
    const { voteThread, loading: voteLoading } = useVoteThread();
    const { toggleSaveThread, loading: saveLoading } = useSaveThread();
    const { deleteThread, loading: deleteLoading } = useDeleteThread();

    // Answer hooks
    const { addAnswer, loading: addAnswerLoading } = useAddAnswer();
    const { answers: answersData, loading: answersLoading, refetch: refetchAnswers } = useGetAllAnswers(params.id);
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
    const fileInputRef = useRef(null);

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
                        console.error(`Error checking like status for answer ${answer.id}:`, error);
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

    const handleVote = async (type) => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }
        try {
            const result = await voteThread(params.id, type);
            if (result.success) {
                const newVotes = type === 'up' ? votes + 1 : votes - 1;
                setVotes(newVotes);
            }
        } catch (err) {
            console.error('Error voting:', err);
        }
    };

    const handleSave = async () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        try {
            const result = await toggleSaveThread(params.id, user.id, isSaved);
            if (result.success) {
                setIsSaved(!isSaved);
            }
        } catch (err) {
            console.error('Error saving:', err);
        }
    };

    const handleEdit = () => {
        router.push(`/allquestions/${params.id}/edit`);
    };

    const handleDelete = async () => {
        try {
            const result = await deleteThread(params.id);
            if (result.success) {
                router.push('/allquestions');
            }
        } catch (err) {
            console.error('Error deleting question:', err);
        }
    };

    // Answer handlers
    const handleSubmitAnswer = async () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        if (!editor?.getHTML() || editor.getHTML().trim() === '<p></p>') {
            alert('Please write an answer before submitting.');
            return;
        }

        try {
            const result = await addAnswer(params.id, editor.getHTML());
            if (result.success) {
                editor.commands.setContent('');
                setShowAnswerEditor(false);
                refetchAnswers(); // Refresh answers list
            }
        } catch (err) {
            console.error('Error submitting answer:', err);
        }
    };

    const handleApproveAnswer = async (answerId, isApproved) => {
        try {
            if (isApproved) {
                await disapproveAnswer(answerId);
            } else {
                await approveAnswer(answerId);
            }
            refetchAnswers(); // Refresh answers list
        } catch (err) {
            console.error('Error updating answer approval:', err);
        }
    };

    const handleLikeAnswer = async (questionId, answerId) => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        try {
            const result = await likeAnswer(questionId, answerId);
            if (result.success) {
                setAnswerLikes(prev => ({
                    ...prev,
                    [answerId]: true
                }));
                refetchAnswers(); // Refresh answers list
            }
        } catch (err) {
            console.error('Error liking answer:', err);
        }
    };

    const handleUnlikeAnswer = async (questionId, answerId) => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }
        try {
            const result = await unlikeAnswer(questionId, answerId);
            if (result.success) {
                setAnswerLikes(prev => ({
                    ...prev,
                    [answerId]: false
                }));
                refetchAnswers(); // Refresh answers list
            }
        } catch (err) {
            console.error('Error unliking answer:', err);
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        if (!isAuthenticated) return;

        try {
            await deleteAnswer(answerId);
            refetchAnswers(); // Refresh answers list
        } catch (err) {
            console.error('Error deleting answer:', err);
        }
    };

    const isOwner = isAuthenticated && user && question && user.id === question.user_id;

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
                    <div className="text-neutral-900 md:ml-[1.8rem] flex items-center">
                        <div className="flex flex-col">
                            <button onClick={() => handleVote('up')}>
                                <ImageComponent
                                    src={UpIcon.src}
                                    alt="upvote"
                                    width={16}
                                    height={16}
                                    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]"
                                />
                            </button>
                            <button onClick={() => handleVote('down')}>
                                <ImageComponent
                                    src={DownIcon.src}
                                    alt="downvote"
                                    width={16}
                                    height={16}
                                    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]"
                                />
                            </button>
                        </div>
                        <div className="md:text-3xl md:font-medium font-medium text-sm md:ml-[0.5rem] text-neutral-900">
                            {votes}
                        </div>
                        <div className="text-neutral-900 md:ml-[1.5rem] ml-[0.7rem] md:text-5xl md:font-semibold font-medium">
                            {question?.title}
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
                    {question?.tags && (
                        <div className="bg-neutral-50 md:w-[71rem] w-[20rem] text-neutral-900 text-sm md:p-4 p-2 md:ml-[2rem] font-light md:text-base">
                            Tags: {question?.tags}
                        </div>
                    )}
                    <div className="border-t border-neutral-100 w-[20rem] md:w-[71rem] md:ml-[2rem]"></div>
                    {/* Actions */}
                    <div className="flex justify-between w-full items-center md:px-6">
                        <div className="bg-primary-300 font-normal text-xs text-white rounded-lg md:text-xl md:w-[10rem] w-[5.625rem] h-[2rem] md:h-[3rem] flex items-center justify-center">
                            {question?.answers_count || 0} Answers
                        </div>
                        <div className="flex space-x-4">
                            <button className="flex items-center text-neutral-500 text-xs md:text-lg font-light gap-2 font-serif">
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
                                {isSaved ? 'Unsave' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Owner Actions */}
                {
                    isOwner && (
                        <div className="w-full flex justify-end items-center gap-6 md:mr-10">
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
                    )
                }

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
                                    <h3 className="text-xl font-semibold mb-4 text-neutral-900">Add Your Answer</h3>

                                    {/* Rich Text Editor Toolbar - Same as ask-question page */}
                                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 mb-4">
                                        <div className="flex flex-col items-center gap-1 mb-2">
                                            <h3 className="font-serif font-bold text-sm md:text-base text-center">
                                                Fonts
                                            </h3>
                                            <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                                                <span
                                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                                    className="cursor-pointer"
                                                >
                                                    <TextBold color="#000000" size={iconSize} />
                                                </span>
                                                <span
                                                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                                    className="cursor-pointer"
                                                >
                                                    <TextUnderline color="#000000" size={iconSize} />
                                                </span>
                                                <span
                                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
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
                                                    onClick={() => editor?.chain().focus().setTextAlign("left").run()}
                                                    className="cursor-pointer"
                                                >
                                                    <TextalignLeft color="#000000" size={iconSize} />
                                                </span>
                                                <span
                                                    onClick={() => editor?.chain().focus().setTextAlign("center").run()}
                                                    className="cursor-pointer"
                                                >
                                                    <TextalignCenter color="#000000" size={iconSize} />
                                                </span>
                                                <span
                                                    onClick={() => editor?.chain().focus().setTextAlign("right").run()}
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
                                                <TfiAlignLeft size={iconSize} className="cursor-pointer" />
                                                <TfiAlignRight size={iconSize} className="cursor-pointer" />
                                                <span
                                                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                                    className="cursor-pointer"
                                                >
                                                    <TfiListOl size={iconSize} />
                                                </span>
                                                <span
                                                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
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
                                            {addAnswerLoading ? 'Submitting...' : 'Submit Answer'}
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
                                    <div key={answer.id} className="py-8 px-12 bg-white rounded-lg">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-secondary-500 md:text-xl text-base font-medium flex items-center gap-2">
                                                <ImageComponent
                                                    src={UserpicIcon.src}
                                                    alt="user"
                                                    width={27}
                                                    height={27}
                                                    className="w-[27px] h-[27px] md:w-[40px] md:h-[40px]"
                                                />
                                                {answer.user?.username || 'User'}
                                                <span className="text-sm text-gray-500 ml-2">
                                                    {new Date(answer.date).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Approval status/button */}

                                                <button
                                                    onClick={() => handleApproveAnswer(answer.id, answer.approved)}
                                                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${answer.approved
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    <ImageComponent
                                                        src={answer.approved ? ApprovedIcon.src : ApproveIcon.src}
                                                        alt={answer.approved ? 'approved' : 'approve'}
                                                        width={16}
                                                        height={16}
                                                        className="w-4 h-4"
                                                    />
                                                    {answer.approved ? 'Approved' : 'Approve'}
                                                </button>


                                                {/* Like button */}
                                                <button
                                                    onClick={() => {
                                                        const isLiked = answerLikes[answer.id];
                                                        if (isLiked) {
                                                            handleUnlikeAnswer(params.id, answer.id);
                                                        } else {
                                                            handleLikeAnswer(params.id, answer.id);
                                                        }
                                                    }}
                                                    className={`flex items-center gap-1 transition-colors ${answerLikes[answer.id]
                                                            ? 'text-blue-600'
                                                            : 'text-gray-600 hover:text-blue-600'
                                                        }`}
                                                    disabled={!isAuthenticated}
                                                >
                                                    <ImageComponent
                                                        src={UpIcon.src}
                                                        alt="like"
                                                        width={16}
                                                        height={16}
                                                        className={`w-4 h-4 ${answerLikes[answer.id] ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                                                    />
                                                    <span className="text-sm">{answer.likes_count || 0}</span>
                                                </button>

                                                {/* Delete button for answer owner or question owner */}
                                                {(isAuthenticated && ((user?.id === answer.user_id) || isOwner)) && (
                                                    <button
                                                        onClick={() => handleDeleteAnswer(answer.id)}
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

                                        {/* Answer content with rich text rendering */}
                                        <div
                                            className="prose prose-sm max-w-none text-neutral-900 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: answer.content }}
                                        />

                                        {/* Answer replies if any */}
                                        {answer.replies && answer.replies.length > 0 && (
                                            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                                                <h5 className="font-medium text-gray-700 mb-2">Replies:</h5>
                                                {answer.replies.map((reply, index) => (
                                                    <div key={index} className="mb-2 last:mb-0">
                                                        <span className="font-medium text-gray-600">
                                                            {reply.user?.username || 'User'}:
                                                        </span>
                                                        <span className="ml-2 text-gray-700">{reply.content}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
        </div >
    );
};

export default QuestionPage;