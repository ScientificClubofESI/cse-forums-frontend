import Image from "next/image";

export const EmptySearchPage = () => {
  return (
    <div className="flex justify-center items-center pt-12 lg:pt-14 font-serif bg-background-light min-h-screen">
      <div className="max-w-[1110px] w-full px-6 mb-20">
        <div className="flex gap-2 flex-col mb-9 lg:mb-12 lg:gap-6">
          <div className="text-2xl font-sans sm:text-4xl font-semibold lg:text-5xl ">
            Results :
          </div>
          <div className="font-serif font-semibold text-base sm:text-lg lg:text-2xl">
            How to search for a question in cse forums
          </div>
        </div>
        <div className="flex justify-center items-center mb-9 lg:mb-12">
          <div className="relative w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96">
            <Image
              src="/emptysearchresult/ilus.png"
              alt="search"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 225px, (max-width: 1024px) 320px, 400px"
              unoptimized
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col text-center gap-3 mb-9 lg:mb-12">
          <div className="text-base sm:text-lg lg:text-2xl text-neutral-900 leading-6 font-normal flex flex-col sm:flex-row items-center gap-1">
            <span className="whitespace-nowrap">
              We couldn't find anything for
            </span>
            <span className="font-bold font-serif whitespace-nowrap">
              "How to search a question in cse forums"
            </span>
          </div>
          <div className="text-base sm:text-lg lg:text-2xl text-neutral-900 leading-6 font-normal w-5/6 sm:w-8/12">
            Try asking a question or using different keywords for your search
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="w-[340px] sm:w-[420px] lg:w-11/12 h-10 lg:h-16 bg-secondary-500 rounded-lg text-white font-sans font-medium text-base lg:text-3xl">
            Ask a Question ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchPage;
