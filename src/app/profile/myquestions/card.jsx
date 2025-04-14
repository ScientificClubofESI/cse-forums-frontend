import React from "react";
import Image from "next/image";
import trash from "../../../../public/trash.png";
import Link from "next/link";

const Card = ({ id, title, content, newAnswersCount, answersCount, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col py-[12px] md:py-[16px] px-[18px] md:px-[24px] bg-white rounded-[8px] gap-[8px] shadow-[0px_0px_64px_0px_#D8D8D866]">
      <h3 className="text-neutral-900 text-xl md:text-2xl font-nunito">{title}</h3>
      <p className="text-neutral-600 font-light text-lg md:text-xl font-nunito">{content}</p>
      {newAnswersCount > 0 && (
        <p className="text-secondary-500 text-xl md:text-2xl font-nunito">
          + {newAnswersCount} new answers
        </p>
      )}
      <div className="flex flex-row justify-between">
        <span className="py-[4px] px-[24px] md:text-lg font-nunito bg-slate-100">
          {answersCount} answers
        </span>
        <div className="flex gap-[4px] md:gap-[8px]">
          <button
            className="px-[16px] py-[4px] text-white bg-primary-500 flex items-center gap-[8px]"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="px-[16px] py-[4px] text-white bg-warning-500 flex items-center gap-[8px]"
            onClick={() => onDelete(id)} // Call delete function
          >           
            Delete
            <Image src={trash} alt="Trash icon" width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};


export default Card;
