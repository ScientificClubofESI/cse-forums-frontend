import Link from "next/link";
import Image from "next/image";

export const Navbarsignedin = () => {
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
              className="w-16 h-16"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4 md:block">
          <div className="relative max-w-full md:max-w-2xl mx-auto">
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
              placeholder="Search CSE Forums ..."
              className="w-full pl-10 pr-4 py-2 rounded bg-white text-gray-800 focus:outline-none font-serif text-sm md:text-base md:w-full sm:w-[75%]"
            />
          </div>
        </div>

        {/* User Icon */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* "All Questions" hidden on small screens */}
          <Link
            href="/questionPage/asker"
            className="text-white hover:text-gray-200 hidden md:block"
          >
            All Questions
          </Link>
          <Link href="">
            <Image
              src={"/nav-bar/User.svg"}
              alt="User"
              width={40}
              height={40}
              className="hover:opacity-80"
            />
          </Link>

          <Link href="/notifications">
            <Image
              src={"/nav-bar/Frame 33603.svg"}
              alt="Frame 33603"
              width={40}
              height={40}
              className="hover:opacity-80"
            />
          </Link>

          <Link href="/profile/settings">
            <Image
              src={"/nav-bar/Frame 33604.svg"}
              alt="Frame 33604"
              width={40}
              height={40}
              className="hover:opacity-80"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};
