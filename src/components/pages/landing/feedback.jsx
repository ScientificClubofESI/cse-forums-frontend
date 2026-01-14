"use client";


import { useState, useEffect } from "react";
import Image from "next/image";
import { feedbacks } from "../../../data/feedbacks";
import switchD from "../../../../public/icons/switchD.svg";
import switchG from "../../../../public/icons/switchG.svg";
import lines from "../../../../public/images/illustrations/LinesSvg.svg";

export const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const updateItemsToShow = () => {
      setItemsToShow(window.innerWidth >= 768 ? 2 : 1);
    };

    updateItemsToShow(); // Initial calculation
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? feedbacks.length - itemsToShow : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= feedbacks.length ? 0 : prev + 1
    );
  };


  return (
    <section className="bg-background-light flex flex-col justify-between items-center gap-12">
      <h1 className="text-4xl lg:text-6xl text-primary-900 font-semibold text-center py-12">Some Feedbacks </h1>

      <div className="flex flex-row justify-center items-center gap-16 py-4 px-8 w-full ">
        {/* Left Icon */}
        <button
          className="absolute lg:left-16 left-6 lg:p-2 p-1"
          onClick={handlePrev}
        >
          <Image src={switchG} alt="switch" className="w-10 lg:w-16" />
        </button>


        {feedbacks.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => (
          <div
            key={index}
            className="relative rounded-2xl bg-[#ffffff] w-2/3 lg:w-1/3 flex flex-col justify-start items-center px-4 gap-1"
          >
            {index === itemsToShow - 1 && (
              <div className="absolute lg:-top-44 -top-28 lg:right-20 right-4 w-20 h-20 lg:w-44 lg:h-44 flex items-center justify-center">
                <Image
                  src={lines}
                  alt="Lines"
                  width={90}
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="relative -top-16 w-24 h-24 lg:w-40 lg:h-40 rounded-full border-4 border-secondary-500 overflow-hidden bg-white">
              <Image
                src={item.photo}
                alt="guest"
                width={170}
                height={170}
                className="object-cover object-top w-full h-full"
              />
            </div>

            <h2 className="lg:text-3xl text-sm font-serif text-center text-neutral-900 font-semibold -mt-12">{item.username}</h2>

            <div className="flex items-stretch">
              <div className="text-primary-900 text-2xl lg:text-6xl font-bold self-start pl-0 lg:pl-4">,,</div>
              <p className="text-center text-xs lg:text-2xl font-serif text-neutral-900 p-8">{item.feedback}</p>
              <div className="text-primary-900 text-2xl lg:text-6xl font-bold self-end pr-0 lg:pr-4">“</div>
            </div>
          </div>
        ))}

        {/* Right Icon */}
        <button
          className="absolute lg:right-16 right-6 lg:p-2 p-1"
          onClick={handleNext}
        >
          <Image src={switchD} alt="switch" className="w-10 lg:w-16" />
        </button>
      </div>
    </section>
  );
};

export default Feedback;
