"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackIcon from "../../../../public/pages/questionPage/back.svg";
import ApprovedIcon from "../../../../public/pages/questionPage/Approved.svg";
import ApproveIcon from "../../../../public/pages/questionPage/Approve.svg";
import UpIcon from "../../../../public/pages/questionPage/up.svg";
import DownIcon from "../../../../public/pages/questionPage/down.svg";
import ShareIcon from "../../../../public/pages/questionPage/share.svg";
import SaveIcon from "../../../../public/pages/questionPage/save.svg";
import UserpicIcon from "../../../../public/pages/questionPage/userpic.svg";
import TrashIcon from "../../../../public/pages/questionPage/trash.svg";
import Image from "next/image";



const Back = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <Image
        src={BackIcon.src}
        alt="back"
        className="w-[25px] h-[25px] md:w-[48px] md:h-[48px]"
      />
    </button>
  );
};

const Approved = () => (
  <Image
    src={ApprovedIcon.src}
    alt="approved"
    className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
  />
);
const Approve = () => (
  <Image
    src={ApproveIcon.src}
    alt="approve"
    className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
  />
);

const Up = () => (
  <button>
    <Image
      src={UpIcon.src}
      alt="up"
      className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]"
    />
  </button>
);
const Down = () => (
  <Image
    src={DownIcon.src}
    alt="down"
    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]"
  />
);

const Share = () => (
  <Image
    src={ShareIcon.src}
    alt="share"
    className="w-[13.5px] h-[13.5px] md:w-[24px] md:h-[24px]"
  />
);

const Save = () => (
  <button>
    <Image
      src={SaveIcon.src}
      alt="save"
      className="w-[13.5px] h-[13.5px] md:w-[24px] md:h-[24px]"
    />
  </button>
);
const Trash = () => (
  <button>
    <Image
      src={TrashIcon.src}
      alt="trash"
      className="w-[18px] h-[18px] md:w-[32px] md:h-[32px]"
    />
  </button>
);

const Userpic = () => (
  <Image
    src={UserpicIcon.src}
    alt="userpic"
    className="w-[27px] h-[27px] md:w-[48px] md:h-[48px]"
  />
);

export const QuestionViewer = () => {
  const router = useRouter();
  const [thread, setThread] = useState(null);

  useEffect(() => {
    const storedThread = sessionStorage.getItem("selectedThread");
    if (storedThread) {
      setThread(JSON.parse(storedThread));
    }
  }, []);

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center p-6">
      <div className="font-semibold text-2xl text-neutral-900 self-start md:ml-[5rem] md:mt-[5rem] mt-[3rem] pb-8 flex items-center gap-4 md:text-6xl">
        <Back />
        Back to questions
      </div>

      <div className="bg-white w-[23rem] md:w-[77rem] flex flex-col items-start font-medium text-xl md:font-semibold md:text-5xl py-8 rounded-lg p-6 gap-4 shadow-lg">
        <div className="text-neutral-900 md:ml-[1.8rem] flex items-center">
          <div className="flex flex-col">
            <Up /> <Down />
          </div>{" "}
          <div className="md:text-3xl md:font-medium font-medium text-sm md:ml-[0.5rem] text-neutral-900">
            64
          </div>
          <div className="text-neutral-900 md:ml-[1.5rem] ml-[0.7rem] md:text-5xl md:font-semibold font-medium">
            {thread?.title}
          </div>
        </div>

        <div className="flex md:w-[99%] md:ml-[2rem] w-[21rem] md:space-x-3 space-x-2">
          <div className="border-t border-neutral-300 md:border-neutral-100 mt-[0.5rem] w-[12.3rem] md:w-[59rem] md:mt-[0.9rem]"></div>
          <div className="md:text-neutral-500 text-neutral-300 text-xs md:text-lg font-light font-serif">
            Posted less than 1 day
          </div>
        </div>

        <div className="text-neutral-900 font-light text-sm md:text-2xl md:ml-[2rem] md:w-[71rem] w-[20rem] font-serif">
          {thread?.content}
        </div>

        <div className="bg-neutral-50 md:w-[71rem] w-[20rem] text-neutral-900 text-sm md:p-4 p-2 md:ml-[2rem] font-light md:text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum
          quisquam in! Dolorem, dolor veniam soluta sapiente ipsum debitis?
          Eveniet, non? Corrupti, harum itaque. Aut dolorum eveniet recusandae
          temporibus sed!
        </div>

        <div className="border-t border-neutral-100 w-[20rem] md:w-[71rem] md:ml-[2rem]"></div>

        <div className="flex justify-between w-full items-center md:px-6">
          <button className="bg-primary-300 font-normal text-xs text-white rounded-lg md:text-xl  md:w-[10rem] w-[5.625rem] h-[2rem] md:h-[3rem] ">
            {thread?.answer_count}
          </button>
          <div className="flex space-x-4">
            <button className="flex items-center text-neutral-500 text-xs md:text-lg font-light gap-2 font-serif">
              <Share /> Share
            </button>
            <button className="flex items-center text-neutral-500 text-xs md:text-lg font-light gap-2 font-serif">
              <Save /> Save
            </button>
          </div>
        </div>
      </div>
      <div className="md:pb-[1rem] pb-[0.2rem]"></div>

      <div className="flex justify-between items-center space-x-[1rem] ml-[4rem] md:space-x-[9rem] md:ml-[7rem]">
        <button className="mt-[2rem] ml-[rem] md:mr-[rem] bg-primary-500 rounded-lg flex items-center justify-center text-white text-sm md:text-3xl font-semibold md:font-medium h-[2.375rem] md:h-[4rem] w-[9.063rem] md:w-[30.688rem]">
          Edit question
        </button>
        <button className="mt-[2rem] ml-[4rem] md:ml-[7rem] bg-warning-500 rounded-lg flex items-center justify-center text-white text-sm md:text-3xl font-semibold md:font-medium h-[2.375rem] md:h-[4rem] w-[9.063rem] md:w-[30.688rem] gap-[4px]">
          Delete question <Trash />
        </button>
      </div>
      <div className="md:pb-[1rem]"></div>

      <div className="md:w-[70rem] w-[18.875rem] mt-[2rem] space-y-6 ml-[4rem] md:ml-[7rem]">
        <div className="bg-white p-6 rounded-lg shadow md:pb-[61px]">
          <div className="flex justify-between items-center md:pb-8">
            <div className="text-secondary-500 md:text-3xl text-base font-medium md:font-bold flex items-center gap-2 md:font-serif">
              <Userpic /> user_name
            </div>
            <div className="text-success-500 text-xs font-medium md:font-bold md:text-lg md:mr-[2rem] flex items-center gap-2 font-serif">
              Approved <Approved />
            </div>
          </div>
          <p className="text-neutral-900 mt-2 md:font-light md:text-2xl font-normal text-base font-serif">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            laudantium quod beatae commodi aperiam, et quae officia odit
            suscipit mollitia! Laborum a placeat blanditiis ab dolores quibusdam
            molestias aspernatur sapiente.
          </p>
        </div>
        <div className="md:pb-[0.6rem] "></div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center md:pb-8">
            <div className="text-secondary-500 md:text-3xl text-base font-medium md:font-bold flex items-center gap-2 md:font-serif">
              <Userpic /> user_name
            </div>
            <div className="text-neutral-900 text-xs font-medium md:font-bold md:text-lg md:mr-[2rem] flex items-center gap-2 font-serif">
              Approve <Approve />
            </div>
          </div>
          <div className="text-neutral-900 mt-2 pb-4 md:font-light md:text-2xl font-normal text-base font-serif">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            laudantium quod beatae commodi aperiam, et quae officia odit
            suscipit mollitia! Laborum a placeat blanditiis ab dolores quibusdam
            molestias aspernatur sapiente.
          </div>
          <div className="bg-neutral-50 p-3 md:font-light md:text-base font-light text-xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates, obcaecati ipsum animi voluptatibus quisquam itaque
            assumenda officia eligendi ratione nostrum vitae at, molestias
            necessitatibus maxime magni officiis error ullam tempore?
          </div>
        </div>
        <div className="md:pb-[0.6rem] "></div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center md:pb-8">
            <div className="text-secondary-500 md:text-3xl text-base font-medium md:font-bold flex items-center gap-2 md:font-serif">
              <Userpic /> user_name
            </div>
            <div className="text-neutral-900 text-xs font-medium md:font-bold md:text-lg md:mr-[2rem] flex items-center gap-2 font-serif">
              Approve <Approve />
            </div>
          </div>
          <p className="text-neutral-900 mt-2 md:font-light md:text-2xl font-normal text-base font-serif">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            laudantium quod beatae commodi aperiam, et quae officia odit
            suscipit mollitia! Laborum a placeat blanditiis ab dolores quibusdam
            molestias aspernatur sapiente.
          </p>
        </div>
      </div>
      <div className="md:pb-[91px] pb-[2rem]"></div>
    </div>
  );
};

export default QuestionViewer;
