"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../../../public/Icon.png";
import empty from "../../../../../public/emtyProfil.png";

export default function Profil() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] p-8 md:p-20 bg-background-light">
      
      {/* Sidebar */}
<div className="w-full md:basis-1/4 flex md:flex-col flex-row gap-x-4 md:gap-x-0 items-center text-center bg-white p-[32px] rounded-[4px] ">
        <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[80px] h-[80px] md:w-[100px] md:h-[100px] overflow-hidden">
          <Image src={user} alt="User profile image" width={100} height={100} />
        </div>
        <div className="mt-4 text-left md:text-center">
          <p className="text-xl md:text-2xl font-bold">Lorem Ipsum</p>
          <p className="text-base md:text-lg text-neutral-600">LoremIpsum@gmail.com</p>
          <Link href={"./settings"} className="md:hidden block mt-4 py-2 px-6 bg-secondary-500 text-white rounded w-fit ">Edit Profile</Link>
        </div>
        <Link href={"./settings"} className="hidden md:block mt-4 py-2 px-6 bg-secondary-500 text-white  rounded">Edit Profile</Link>
      </div>


      {/* Navigation */}
      <div className="basis-3/4">
      <div className="flex flex-row justify-between gap-3 md:gap-6 mb-8">
          <Link href="/profile/myquestions" className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white">
            My Questions
          </Link>
          <Link href="/profile/myreplies" className="text-center w-full py-1 md:py-2 md:px-6 text-lg bg-white rounded hover:bg-secondary-500 hover:text-white">
            My Answers
          </Link>
          <Link href="/profile/savedquestions" className="text-center w-full text-white py-1 md:py-2 md:px-6 text-lg bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white">
            Saved Questions
          </Link>
        </div>

        <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <Image src={empty} alt="No data available" width={400} height={400} />
          <div className="text-center text-neutral-900 text-xl md:text-2xl font-oswald">
            No Question saved Yet
          </div>
        </div>

        <div className="py-[12px] px-[40px] bg-secondary-500 text-white font-oswald rounded-[8px] text-center">
           Ask a new Question?
       </div>
        </div>
      </div>
    </div>
  );
}
