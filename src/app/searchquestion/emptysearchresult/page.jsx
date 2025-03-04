import Navbar from "@/components/navbar/navbarnotsignedin";
import Image from "next/image";
import Link from "next/link";
export const EmptySearchPage = ({ search }) => {
  const capitalizeSearch = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizedSearch = search ? capitalizeSearch(search.trim()) : "";

  return (
<<<<<<< HEAD
    <div className="bg-background-light">
=======
    <div className="bg-background-light w-full">
      {/* <Navbar /> */}
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
      <div className="flex justify-center items-center pt-12 lg:pt-14 font-serif bg-background-light min-h-screen text-neutral-900">
        <div className="max-w-[1110px] w-full px-6 mb-20">
          <div className="flex gap-2 flex-col mb-9 lg:mb-12 lg:gap-6">
            <div className="text-2xl font-sans sm:text-4xl font-semibold lg:text-5xl ">
              Results :
            </div>
            <div className="font-sans lg:font-serif font-semibold lg:font-bold text-base sm:text-xl lg:text-2xl truncate max-w-md md:max-w-lg lg:max-w-6xl">
              {capitalizedSearch}
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
            <div className="text-base sm:text-lg lg:text-2xl leading-6 font-normal flex flex-col sm:flex-row items-center gap-1">
              <span className="whitespace-nowrap">
                We couldn't find anything for
              </span>
              <div className="flex font-semibold lg:font-serif lg:font-bold font-sans">
                <span className="truncate max-w-xs lg:max-w-lg inline-block overflow-hidden text-ellipsis">
                  {`“${capitalizedSearch}`}
                </span>
                <span>”</span>
              </div>
            </div>
            <div className="text-base sm:text-lg lg:text-2xl leading-6 font-normal w-5/6 sm:w-8/12">
              Try asking a question or using different keywords for your search
            </div>
          </div>

          {/* <Link
            className="w-full flex justify-center items-center"
            href="/questionPage/asker"
          >
            <button className="w-full max-w-[340px] sm:max-w-[320px] md:max-w-[300px] lg:max-w-[1110px] h-10 lg:h-16 bg-secondary-500 hover:bg-orange-600 rounded-lg text-white font-sans font-medium text-base lg:text-3xl">
              Ask a Question ?
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default EmptySearchPage;
