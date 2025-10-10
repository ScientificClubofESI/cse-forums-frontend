import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import User from "../../../public/pages/nav-bar/icons/User.svg";
import notification from "../../../public/pages/nav-bar/icons/Frame33603.svg";
import settings from "../../../public/pages/nav-bar/icons/Frame33604.svg";
import icon from "../../../public/pages/nav-bar/icons/Icon.svg";
import logo from "../../../public/pages/nav-bar/icons/Logo.svg";
import api from "@/lib/api";
import { useState, useEffect } from "react";

// the lgout hook
import useAuth, { useLogout } from "@/hooks/Auth";

export const Navbarsignedin = () => {
  const router = useRouter();
  const [searchQuery, setsearchQuery] = useState("");
  const { logout, loading: logoutLoading } = useLogout();

  // Handle logout
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push("auth/login");
      console.log("Successfully logged out");
    } else {
      console.error("Logout failed");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      router.push(
        `/searchquestion?q=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };


  return (
    <div className="bg-gray-100">
      <nav className="bg-primary-700 flex items-center justify-between px-6 py-3 border-b-2 rounded-b-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src={logo}
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
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            {/* Search icon as submit button */}
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!searchQuery.trim()}
            >
              <Image
                src={icon}
                alt="search"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
                className="cursor-pointer"
              />
            </button>

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
          </form>
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
              src={User}
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
