import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import api from "@/lib/api";


export default function Search({ setthreads, setCurrentPage }) {
  const [searchQuery, setsearchQuery] = useState("");
  useEffect(() => {
    const fetchSearchThreads = async () => {
      setCurrentPage(1); // crucial because even if an element of another page  is found, it stays on the current page
      try {
        const response = await api.get(
          `/threads/search?searchQuery=${searchQuery}`
        );
        //console.log("search response : ", response.data);
        setthreads(response.data.data);
      } catch (error) {
        //console.error("error fetching search : ", error);
      }
    };
    fetchSearchThreads();
  }, [searchQuery, setthreads, setCurrentPage]);
  return (
    <div className="flex-1 mx-8 hidden md:block w-full">
      <div className="relative max-w-2xl mx-auto">
        {/* Search Icon */}
        <Image
          src={"/nav-bar/Icon.svg"}
          alt="search"
          width={20}
          height={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          placeholder="Search CSE Forums ..."
          onChange={(e) => {
            setsearchQuery(e.target.value);
          }}
          className="w-full pl-10 pr-4 py-2 rounded bg-white text-gray-800 focus:outline-none font-serif"
        />
      </div>
    </div>
  );
}
