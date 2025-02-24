"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../public/Icon.png";
import Myquestions from "./myquestions/page";
import { useEffect } from "react";
import axios from "axios";

export default function Profil() {
  const UserId = localStorage.getItem("userId"); // we can customize this later (based on login/singup logic for handling the place of the userid)
  const getUserProfile = async () => {
    const response = await axios.get(`http://localhost:5000/user/${UserId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token because it is required as show in userRoutes in the backend (router.use(verifyUser))
      },
    });
    // the request will be blocked for now because we did not merge yet the authentication part (signup/login)
    console.log(response.data);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      {/* Sidebar */}
      <div className="basis-1/4 flex flex-col items-center text-center bg-slate-100 p-[32px] rounded-[4px]">
        <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[100px] h-[100px] overflow-hidden">
          <Image src={user} alt="User profile image" width={100} height={100} />
        </div>
        <div className="mt-4">
        <p className="text-2xl font-bold">Lorem Ipsum</p>
          {/* <p className="text-2xl font-bold">{response.data.fullName} </p> */}
          <p className="text-lg text-neutral-600">LoremIpsum@gmail.com</p>
          {/* <p className="text-lg text-neutral-600">{response.data.email}</p> */}
        </div>
        <button className="mt-4 py-2 px-6 bg-secondary-500 text-white rounded">
          Edit Profile
        </button>
      </div>

      {/* Navigation */}
      <div className="basis-3/4">
        <div className="flex flex-row gap-6 mb-8">
          <Link
            href="/profile/myquestions"
            className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white"
          >
            My Questions
          </Link>
          <Link
            href="/profile/myreplies"
            className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white"
          >
            My Answers
          </Link>
          <Link
            href="/profile/savedquestions"
            className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white"
          >
            Saved Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
