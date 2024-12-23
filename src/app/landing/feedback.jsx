"use client";


import { useState } from "react";
import Image from "next/image";
import { feedbacks } from "./export";
import switchD from "../../../public/switchD.svg";
import switchG from "../../../public/switchG.svg";


export const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsToShow = typeof window !== "undefined" && window.innerWidth >= 1024 ? 2 : 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - itemsToShow : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= feedbacks.length ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-background-light flex flex-col justify-between items-center gap-12">
      <h1 className="text-4xl lg:text-6xl text-primary-900 font-semibold text-center pt-12">Some Feedbacks </h1>        

      <div className="flex flex-row justify-center items-center gap-16 py-4 px-8 w-full overflow-hidden">
        {/* Left Icon */}
        <button
          className="absolute left-16 p-2"
          onClick={handlePrev}
        >
          <Image src={switchG} alt="switch" width={60}/>
        </button>

        {feedbacks.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-[#FFF] w-5/6 lg:w-1/3 flex flex-col justify-center items-center p-4"
          >
            <Image src={item.photo} alt="guest" width={170} height={170} className="rounded-full border-4 border-secondary-500 overflow-hidden"/>
            <h2 className="lg:text-3xl text-sm font-serif text-center text-neutral-900 font-semibold">{item.username}</h2>
            <p className="text-center text-xs lg:text-2xl font-serif text-neutral-900 p-8">{item.feedback}</p>
          </div>
        ))}

        {/* Right Icon */}
        <button
          className="absolute right-16 p-2"
          onClick={handleNext}
        >
          <Image src={switchD} alt="switch" width={60}/>
        </button>
      </div> 
    </section>
  );
};

export default Feedback;
