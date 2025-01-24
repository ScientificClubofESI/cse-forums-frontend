import Image from "next/image";
export const EmptySearchPage = () => {
  return (
    <div className=" flex justify-center items-center pt-12 lg:pt-14 font-serif bg-neutral-100 min-h-screen">
      <div className="flex flex-col  w-96 gap-9  sm:w-[680px] lg:w-[1110px] lg:gap-12  mb-20 ">
        <div className="flex gap-2 flex-col px-6 sm:gap-4 lg:gap-6">
          <div className="text-2xl font-sans sm:text-4xl font-semibold lg:text-5xl ">
            Results :
          </div>
          <div className="font-serif font-semibold text-base sm:text-lg lg:text-2xl">
            How to search for a question in cse forums
          </div>
        </div>
        <div className="flex justify-center items-center w-96 sm:w-[680px] lg:w-[1110px]">
          <div className="w-56 h-56 sm:w-76 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative">
            <Image
              src="/emptysearchresult/ilus.png"
              alt="search"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 225px,320px, 400px"
              unoptimized
            />
          </div>
        </div>
        <div className=" flex  justify-center items-center flex-col text-center gap-3 text-base w-[390px] sm:w-[680px] sm:text-lg text-neutral-900 lg:text-2xl lg:inline  lg:w-[1110px]">
          <span className="lg:mx-auto leading-6 font-normal">
            We couldn’t find anything for{" "}
          </span>
          <span className="font-bold font-serif ">
            "How to search a question in cse forums"
          </span>
          <div className="lg:mx-auto  sm:w-8/12 w-5/6 leading-6, font-normal ">
            Try asking a question or using different keywords for your search
          </div>
        </div>
        <div className="flex justify-center items-center w-[384px] sm:w-[680px] lg:w-[1110px]">
          <button className="flex justify-center items-center text-[28px] leading-[40px]  w-[340px] sm:w-[420px]  lg:w-11/12  h-10 bg-secondary-500 rounded-lg text-white font-medium text-base lg:text-2lx lg:h-16 lg:text-3xl font-sans">
            Ask a Question ?
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmptySearchPage;
