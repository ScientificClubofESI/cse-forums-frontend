import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import Link from "next/link";
export const EmptySearchPage = () => {
  return (
    <div className=" bg-background-light ">
      <Navbar />
      <div className="flex justify-center items-center pt-12 lg:pt-14 font-serif bg-background-light min-h-screen">
        <div className="max-w-[1110px] w-full px-6 mb-20">
          <div className="flex gap-2 flex-col mb-9 lg:mb-12 lg:gap-6">
            <div className="text-2xl font-sans sm:text-4xl font-semibold lg:text-5xl ">
              Results :
            </div>
            <div className="font-serif font-semibold text-base sm:text-lg lg:text-2xl truncate max-w-sm md:max-w-md lg:max-w-6xl">
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

              <div className="font-bold font-serif flex ">
                <span className="truncate max-w-xs md md:max-w-md inline-block overflow-hidden text-ellipsis">
                  "How to search a question in cse forums
                  hhhhhhhhhhhhhhhhhhhhhh"
                </span>
                <div>"</div>
              </div>
            </div>
            <div className="text-base sm:text-lg lg:text-2xl text-neutral-900 leading-6 font-normal w-5/6 sm:w-8/12">
              Try asking a question or using different keywords for your search
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/questionPage/asker">
              <button className="w-[340px] sm:w-[420px] lg:w-11/12 h-10 lg:h-16 bg-secondary-500 rounded-lg text-white font-sans font-medium text-base lg:text-3xl">
                Ask a Question ?
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchPage;
