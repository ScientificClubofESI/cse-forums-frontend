"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../public/Icon.png";
import Myquestions from "./myquestions/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "@/components/profile/sidebar";

export default function Profil() {
  

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      {/* Sidebar */}
      <Sidebar/>

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
