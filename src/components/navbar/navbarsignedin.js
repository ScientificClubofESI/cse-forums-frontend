import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import user from "../../../public/pages/nav-bar/User.svg";
import notification from "../../../public/pages/nav-bar/Frame33603.svg";
import settings from "../../../public/pages/nav-bar/Frame33604.svg";
import api from "@/lib/api";
import authApi from "@/lib/authApi";
import { useState, useEffect } from "react";

export const Navbarsignedin = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      // Call logout API
      await authApi.post("/auth/logout", {
        userId,
      });
      localStorage.clear();
      sessionStorage.clear();
            
      // Redirect to login page
      router.push("/auth/login");
      
    } catch (error) {
      console.error("Logout error:", error);
      
      // Even if API call fails, clear local data and redirect
      localStorage.clear();
      sessionStorage.clear();
      
      router.push("/auth/login");
    } finally {
      setIsLoggingOut(false);
    }
  };
  const [searchQuery, setsearchQuery] = useState("");
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
    <div className="bg-gray-100">
      <nav className="bg-primary-700 flex items-center justify-between px-6 py-3 border-b-2 rounded-b-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/nav-bar/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              style={{ width: "auto", height: "auto" }}
              className="w-16 h-16"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8 hidden md:block">
          <div className="relative max-w-2xl mx-auto">
            {/* Search Icon */}
            <Image
              src={"/nav-bar/Icon.svg"}
              alt="search"
              width={20}
              height={20}
              style={{ width: "auto", height: "auto" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            {/* Input Field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setsearchQuery(e.target.value);
              }}
              placeholder="Search CSE Forums ..."
              className="w-full pl-10 pr-4 py-2 rounded bg-white text-gray-800 focus:outline-none font-serif"
            />
          </div>
          {/* Dropdown Results */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
              {searchResults.slice(0, 6).map((thread) => (
                <Link
                  key={thread.id}
                  href={`/questionPage/${
                    thread.user_id == userId ? `asker` : `viewer`
                  }`}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  {thread.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* User Icon */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* "All Questions" hidden on small screens */}
          <Link
            href="/allquestions"
            className="text-white hover:text-gray-200 hidden md:block"
          >
            All Questions
          </Link>
          <Link href="/profile/myquestions">
            <Image
              src={user}
              alt="User"
              width={40}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="hover:opacity-80"
            />
          </Link>

          <Link href="/notifications">
            <Image
              src={notification}
              alt="Frame 33603"
              width={40}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="hover:opacity-80"
            />
          </Link>

          <Link href="/profile/settings">
            <Image
              src={settings}
              alt="Frame 33604"
              width={40}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="hover:opacity-80"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-secondary-500 hover:bg-orange-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Navbarsignedin;
