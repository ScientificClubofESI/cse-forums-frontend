import React from "react";
import Image from "next/image";
import trash from "../../../../../public/icons/trash.png";
import approve from "../../../../../public/icons/approved.png";
const Card = ({ title, content, approved, onDelete }) => {
  const handleNavigation = () => {
    //console.log("navigated to...");
  };
  return (
    <div className="flex flex-col py-[12px] md:py-[16px] px-[18px] md:px-[24px] bg-white rounded-[8px] gap-[8px] shadow-[0px_0px_64px_0px_#D8D8D866]">
      <div onClick={() => handleNavigation()}>
        <h3 className="text-neutral-900 text-xl md:text-2xl font-nunito">
          Q: {title}
        </h3>
        <h3 className="text-neutral-900 text-xl md:text-2xl font-nunito">
          Answer:{" "}
        </h3>
        <div 
        className="text-neutral-600 font-light text-lg md:text-xl font-nunito prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      </div>

      <div className="flex flex-row justify-between">
        {approved ? (
          <div className="px-[16px] py-[4px] text-success-500   bg-[#E9F9E8] flex items-center gap-[8px]">
            Approved
            <Image src={approve} alt="Aprroved icon" width={16} height={16} />
          </div>
        ) : (
          <div className="px-[16px] py-[4px]"> </div>
        )}
        <button
          className="px-[16px] py-[4px] text-white bg-warning-500 flex items-center gap-[8px]"
          onClick={onDelete}
        >
          Delete
          <Image src={trash} alt="Trash icon" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default Card;
