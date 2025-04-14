"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../../../public/Icon.png";
import empty from "../../../../../public/emtyProfil.png";
import Sidebar from "@/components/profile/sidebar";

export default function Profil() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      {/* Sidebar */}
      <Sidebar />


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
            className="py-2 px-6 bg-secondary-500 rounded hover:bg-secondary-500 text-white"
          >
            Saved Questions
          </Link>
        </div>

        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[16px] justify-center items-center">
            <Image
              src={empty}
              alt="No data available"
              width={400}
              height={400}
            />
            <div className="text-center text-neutral-900 text-xl md:text-2xl font-oswald">
              No Question saved Yet
            </div>
          </div>

          <Link href="/questionPage/asker">
            <button className="py-[12px] px-[40px] bg-secondary-500 text-white font-oswald rounded-[8px] text-center">
              Ask a new Question?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
