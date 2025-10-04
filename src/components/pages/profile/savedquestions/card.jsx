import React from "react";
import Image from "next/image";
import unsaved from "../../../../public/icons/save.png";

const Card = ({ id, title, content, onDelete }) => {
  //console.log(id, title, content);
  return (
    <div className="flex flex-col py-[12px] md:py-[16px] px-[18px] md:px-[24px] bg-white rounded-[8px] gap-[8px] shadow-[0px_0px_64px_0px_#D8D8D866]">
      <h3 className="text-neutral-900 text-xl md:text-2xl font-nunito">
        {title}
      </h3>
      <p className="text-neutral-600 font-light text-lg md:text-xl font-nunito">
        {content}
      </p>
      <div className="flex flex-row justify-between">
        <span className="py-[4px] px-[24px] md:text-lg font-nunito bg-slate-100">
          10 answers
        </span>

        <button
          className="px-[16px] py-[4px] text-white bg-neutral-700 flex items-center gap-[8px]"
          onClick={onDelete}
        >
          Unsave
          <Image src={unsaved} alt="Trash icon" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default Card;
