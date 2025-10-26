import { SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

import bgDesktop from "../../../../public/images/illustrations/bg.svg";
import bgMobile from "../../../../public/images/illustrations/bgr.svg";

// the auth hook
import useAuth from "@/hooks/Auth";


const Hero = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchQuery, setsearchQuery] = useState("");
  const router = useRouter();


  const { userId, isAuthenticated } = useAuth();

  const handleNavigate = (thread) => {
    router.push(`/question/${thread.id}`);
  };

  useEffect(() => {
    const fetchSearchThreads = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }
      //setCurrentPage(1); // crucial because even if an element of another page  is found, it stays on the current page
      try {
        const response = await api.get(
          `/threads/search?searchQuery=${searchQuery}`
        );
        //console.log("search response : ", response.data);
        setSearchResults(response.data.data);
        setShowDropdown(true);
        //setthreads(response.data.data);
      } catch (error) {
        //console.error("error fetching search : ", error);
      }
    };
    fetchSearchThreads();
  }, [searchQuery]);


  return (
    <div className="relative w-full bg-background-light py-16">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 hidden sm:block">
        <Image
          src={bgDesktop}
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 w-full h-full z-0 block sm:hidden">
        <Image
          src={bgMobile}
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Logo/Title */}
        <h1 className="mb-10 text-5xl sm:text-8xl font-bold text-primary-900 font-sans">
          CSE Forums
        </h1>

        {/* Welcome message */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-semibold text-primary-500 font-sans">
            Hello my friend!
          </h2>
          <p className="text-lg sm:text-3xl font-normal text-[#0C2239] font-serif">
            It&apos;s a good day to ask a question, isn&apos;t it?
          </p>
        </div>

       

        {/* CTA Button */}
        {/* if authenticated redirect to the ask question else redirect to login */}
        <div className="flex items-center justify-center">
        <Link
          href={isAuthenticated ? "/ask-question" : "/auth/login"}
          className="text-white hover:text-gray-200 ml-2 mr-8 sm:mr-14"
        >
          <button className="rounded-lg max-w-5xl bg-secondary-500 px-8 py-3 text-lg font-medium font-sans text-white transition-colors hover:bg-orange-600">
            Ask a Question?
          </button>
        </Link>
           <Link
          href={ "/allquestions"}
          className="text-white hover:text-gray-200 ml-2 mr-8 sm:mr-14"
        >
          <button className="rounded-lg max-w-5xl bg-primary-300 hover:bg-primary-500 px-8 py-3 text-lg font-medium font-sans text-white transition-colors">
            All Questions
          </button>
        </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
