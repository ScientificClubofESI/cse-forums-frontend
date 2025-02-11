"use client";
import Link from "next/link";
import Image from "next/image";
import user from "../../../../public/Icon.png";
import MyRepliesList from "./replieslist";

export default function Profil() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      
      {/* Sidebar */}
      <div className="basis-1/4 flex flex-col items-center text-center bg-slate-100 p-[32px] rounded-[4px]">
        <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[100px] h-[100px] overflow-hidden">
          <Image src={user} alt="User profile image" width={100} height={100} />
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">Lorem Ipsum</p>
          <p className="text-lg text-neutral-600">LoremIpsum@gmail.com</p>
        </div>
        <button className="mt-4 py-2 px-6 bg-secondary-500 text-white rounded">Edit Profile</button>
      </div>

      {/* Navigation */}
      <div className="basis-3/4">
        <div className="flex flex-row gap-6 mb-8">
          <Link href="/profile/myquestions" className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white">
            My Questions
          </Link>
          <Link href="/profile/myreplies" className="text-white py-2 px-6 bg-secondary-500 rounded hover:bg-secondary-500 hover:text-white">
            My Answers
          </Link>
          <Link href="/profile/savedquestions" className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white">
            Saved Questions
          </Link>
        </div>

        <div>
        <MyRepliesList />
        </div>
      </div>
    </div>
  );
}
