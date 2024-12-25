import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-gray-100">
      <nav className="bg-primary-700 flex items-center justify-between px-5 sm:12 py-3 border-b-2 rounded-b-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/footer/subtract.svg"
              alt="Logo"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8 hidden md:block">
          <div className="relative max-w-2xl mx-auto">
            {/* Search Icon */}
            <Image
              src={'/nav-bar/Icon.svg'}
              alt="search"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search CSE Forums ..."
              className="w-full pl-10 pr-4 py-2 rounded bg-white text-gray-800 focus:outline-none font-serif"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 font-sans">
          <Link 
            href="/questions"
            className="text-white hover:text-gray-200 ml-2 mr-8 sm:mr-14"
          >
            All Questions
          </Link>
          <Link 
            href="/login"
            className="px-4 py-2 bg-primary-300 hover:bg-primary-500 text-white rounded"
          >
            Log in
          </Link>
          <Link 
            href="/signup"
            className="px-4 py-2 bg-secondary-500 hover:bg-orange-600 text-white rounded"
          >
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
