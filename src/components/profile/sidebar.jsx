"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import User from "../../../public/images/avatars/Icon.png";
// import Myquestions from "./myquestions/page";
import { useEffect, useState, useCallback } from "react";
// Import the hooks
import useAuth, { useUserProfile } from "@/hooks/Auth";

export default function Sidebar() {

  // Authentication and profile hooks
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error: profileError, updateProfile } = useUserProfile(userId);


  return (
    <div className="basis-1/4 flex flex-col items-center text-center bg-white p-[32px] rounded-[4px]">
      <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[100px] h-[100px] overflow-hidden">
        <Image src={User} alt="User profile image" width={100} height={100} />
      </div>
      <div className="mt-4">
        <p className="text-2xl font-normal font-sans">{profile?.fullname}</p>
        {/* <p className="text-2xl font-bold">{response.data.fullName} </p> */}
        <p className="text-lg text-neutral-600">{profile?.email}</p>
        {/* <p className="text-lg text-neutral-600">{response.data.email}</p> */}
      </div>
      <Link href="/profile/settings">
        <button className="mt-6 py-2 px-6 bg-secondary-500 text-white rounded">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
