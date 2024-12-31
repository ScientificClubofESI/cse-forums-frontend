"use client"; 
import { useState } from "react";
import Myquestions from "./myquestions/page";
import MyReplies from "./myreplies/page";
import SavedQuestions from "./savedquestions/page";
import user from "../../../public/Icon.png";
import Image from "next/image";

export const Profil = () => {
  const [activeSection, setActiveSection] = useState("questions");

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20 ">

      <div className="basis-1/4 flex flex-row md:flex-col text-center items-center  justify-center gap-[32px] bg-slate-100 p-[32px] rounded-[4px]">
        <div className="flex justify-center items-center rounded-full bg-neutral-900 w-[100px] h-[100px] overflow-hidden">
            <Image src={user} alt="User profile image" width={100} height={100} />
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <div className="flex flex-col">
            <p className="font-nunito text-xl md:text-2xl text-neutral-900 font-bold">Lorem Ipsum</p>
            <p className="font-nunito text-lg md:text-xl text-neutral-900 font-light">LoremIpsum@gmail.com</p>
          </div>
          <button className="py-[4px] px-[32px] md:px-[48px] font-oswald text-lg text-white bg-secondary-500 font-normal rounded-[4px]">
           Edit Profile
         </button>
       </div>

      </div>

      <div className="basis-3/4">
        <div className="flex flex-row items-center gap-[48px] mb-8">
          <button
            onClick={() => setActiveSection("questions")}
            className={`py-[4px] px-[24px] md:px-[48px]  font-oswald md:text-lg ${
              activeSection === "questions" ? "text-white bg-secondary-500" : "text-neutral-900 bg-white"
            } font-normal rounded-[4px]`}
          >
            My Questions
          </button>
          <button
            onClick={() => setActiveSection("replies")}
            className={`py-[4px] px-[24px] md:px-[48px] font-oswald text-lg ${
              activeSection === "replies" ? "text-white bg-secondary-500" : "text-neutral-900 bg-white"
            } font-normal rounded-[4px]`}
          >
            My Answers
          </button>
          <button
            onClick={() => setActiveSection("saved")}
            className={`py-[4px] px-[24px] md:px-[48px] font-oswald text-lg ${
              activeSection === "saved" ? "text-white bg-secondary-500" : "text-neutral-900 bg-white"
            } font-normal rounded-[4px]`}
          >
            Saved Questions
          </button>
        </div>

        {/* Render Active Section */}
        <div>
          {activeSection === "questions" && <Myquestions />}
          {activeSection === "replies" && <MyReplies />}
          {activeSection === "saved" && <SavedQuestions />}
        </div>
      </div>
    </div>
  );
};

export default Profil;
