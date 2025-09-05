"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import user from "../../../public/Icon.png";
// import Myquestions from "./myquestions/page";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Sidebar() {
  const [userId, setUserId] = useState(null);
useEffect(() => {
  if (typeof window !== "undefined") {
    setUserId(localStorage.getItem("userId"));
  }
}, []);
  const UserId = userId; // we can customize this later (based on login/singup logic for handling the place of the userid)
  const [userInfo, setuserInfo] = useState({});
  const getUserProfile = async () => {
    try {
      // Ensure UserId is defined
      if (!UserId) {
        //console.error("UserId is not defined");
        return;
      }

      // Make the request to fetch the user profile
      const response = await api.get(`/user/${UserId}`);

      // Log the response data
      //console.log("User profile data:", response.data);
      setuserInfo(response.data.data);
      return response.data; // Return the data for further use
    } catch (error) {
      // Handle errors
      if (error.response) {
        //console.error("Error response:", error.response.data);
        //console.error("Status code:", error.response.status);
      } else if (error.request) {
        //console.error("No response received:", error.request);
      } else {
        //console.error("Error:", error.message);
      }

      //TODO see what this is for
      // Redirect to login if the error is due to an invalid or expired token
      // if (error.message === "Failed to refresh token") {
      //   if (typeof window !== "undefined") {
      //     window.location.href = "/auth/login";
      //   }
      // }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="basis-1/4 flex flex-col items-center text-center bg-white p-[32px] rounded-[4px]">
      <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[100px] h-[100px] overflow-hidden">
        <Image src={user} alt="User profile image" width={100} height={100} />
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{userInfo.fullname}</p>
        {/* <p className="text-2xl font-bold">{response.data.fullName} </p> */}
        <p className="text-lg text-neutral-600">{userInfo.email}</p>
        {/* <p className="text-lg text-neutral-600">{response.data.email}</p> */}
      </div>
      <Link href="/profile/settings">
        <button className="mt-4 py-2 px-6 bg-secondary-500 text-white rounded">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
