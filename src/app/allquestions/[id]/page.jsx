"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../hooks/Auth";
import { useQuestion, useSaveThread, useVoteThread, useDeleteThread } from "../../../hooks/Questions";
import Image from "next/image";
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

    const [answers, setAnswers] = useState([]);
    const [votes, setVotes] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (question) {
            setVotes(question.votes || 0);
            setAnswers(question.answers || []);
        }
    }, [question]);

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
                        <Image
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
                                <Image
                                    src={UpIcon.src}
                                    alt="upvote"
                                    width={16}
                                    height={16}
                                    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]"
                                />
                            </button>
                            <button onClick={() => handleVote('down')}>
                                <Image
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
                    <div className="text-neutral-900 font-light text-sm md:text-2xl md:ml-[2rem] md:w-[71rem] w-[20rem] font-serif">
                        {question?.content}
                    </div>
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
                            {question?.answer_count || 0} Answers
                        </div>
                        <div className="flex space-x-4">
                            <button className="flex items-center text-neutral-500 text-xs md:text-lg font-light gap-2 font-serif">
                                <Image
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
                                <Image
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
                                <Image
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
                {/* Answers Section */}
                {
                    answers.length > 0 && (
                        <div className="md:w-[70rem] w-[18.875rem] mt-[2rem] space-y-6 ml-[4rem] md:ml-[7rem]">
                            {answers.map((answer) => (
                                <div key={answer.id} className="bg-white p-6 rounded-lg shadow md:pb-[61px]">
                                    <div className="flex justify-between items-center md:pb-8">
                                        <div className="text-secondary-500 md:text-3xl text-base font-medium md:font-bold flex items-center gap-2 md:font-serif">
                                            <Image
                                                src={UserpicIcon.src}
                                                alt="user"
                                                width={27}
                                                height={27}
                                                className="w-[27px] h-[27px] md:w-[48px] md:h-[48px]"
                                            />
                                            {answer.user?.username || 'User'}
                                        </div>
                                        {/* Show approve/approved status */}
                                        {isOwner ? (
                                            <button
                                                onClick={() => handleApproveAnswer(answer.id)}
                                                className={`text-xs font-medium md:font-bold md:text-lg md:mr-[2rem] flex items-center gap-2 font-serif ${answer.approved ? 'text-success-500' : 'text-neutral-900'
                                                    }`}
                                            >
                                                {answer.approved ? 'Approved' : 'Approve'}
                                                <Image
                                                    src={answer.approved ? ApprovedIcon.src : ApproveIcon.src}
                                                    alt={answer.approved ? 'approved' : 'approve'}
                                                    width={20}
                                                    height={20}
                                                    className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
                                                />
                                            </button>
                                        ) : (
                                            answer.approved && (
                                                <div className="text-success-500 text-xs font-medium md:font-bold md:text-lg md:mr-[2rem] flex items-center gap-2 font-serif">
                                                    Approved
                                                    <Image
                                                        src={ApprovedIcon.src}
                                                        alt="approved"
                                                        width={20}
                                                        height={20}
                                                        className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <p className="text-neutral-900 mt-2 md:font-light md:text-2xl font-normal text-base font-serif">
                                        {answer.content}
                                    </p>
                                    {/* Answer replies if any */}
                                    {answer.replies && answer.replies.length > 0 && (
                                        <div className="bg-neutral-50 p-3 md:font-light md:text-base font-light text-xs mt-4">
                                            {answer.replies.map((reply, index) => (
                                                <div key={index}>
                                                    <strong>{reply.user?.username || 'User'}:</strong> {reply.content}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                }
                {/* Answer Form for authenticated users */}
                {
                    isAuthenticated && !isOwner && (
                        <div className="md:w-[70rem] w-[18.875rem] mt-[2rem] ml-[4rem] md:ml-[7rem]">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-semibold mb-4">Add Your Answer</h3>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                                    placeholder="Write your answer here..."
                                />
                                <button className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600">
                                    Submit Answer
                                </button>
                            </div>
                        </div>
                    )
                }
                <div className="md:pb-[91px] pb-[2rem]"></div>
            </div>
        </div >
    );
};

export default QuestionPage;