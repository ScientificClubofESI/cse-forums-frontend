import React from "react";
import Image from "next/image";
import unsaved from "../../../../../public/icons/save.png";
import { useSaveThread } from "@/hooks/Questions";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Card = ({ id, title, content, answersCount, onDelete, onError }) => {
  const router = useRouter();
   const { unsaveThread, loading } = useSaveThread();
  const [isUnsaving, setIsUnsaving] = useState(false);

  //console.log(id, title, content);
  // logic for unsave thread

   const handle_unsaveThread = async () => {
    setIsUnsaving(true);
    try {
      const result = await unsaveThread(id);
      if (result.success) {
        // Call onDelete to refresh the parent list
        onDelete && onDelete(id);
      } else {
        onError && onError('Failed to unsave thread: ' + result.error);
      }
    } catch (error) {
      console.error('Error unsaving thread:', error);
      onError && onError('An error occurred while unsaving the thread.');
    } finally {
      setIsUnsaving(false);
    }
  };


  return (
    <div className="flex flex-col py-[12px] md:py-[16px] px-[18px] md:px-[24px] bg-white rounded-[8px] gap-[8px] shadow-[0px_0px_64px_0px_#D8D8D866]">
      <h3 className="text-neutral-900 text-xl md:text-2xl font-nunito">
        {title}
      </h3>
       <div 
        className="text-neutral-600 font-light text-lg md:text-xl font-nunito prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      <div className="flex flex-row justify-between">
        <span className="py-[4px] px-[24px] md:text-lg font-nunito bg-slate-100 cursor-pointer" onClick={() => router.push(`/allquestions/${id}`)}>
          {answersCount} Answers
        </span>

        <button
          className="px-[16px] py-[4px] text-white bg-neutral-700 flex items-center gap-[8px]"
          onClick={handle_unsaveThread}
          disabled={isUnsaving || loading}
        >
          Unsave
          <Image src={unsaved} alt="Trash icon" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default Card;
