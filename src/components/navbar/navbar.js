import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-gray-100">
      <nav className="bg-primary-700 flex items-center justify-between px-5 sm:px-12 py-3 border-b-2 rounded-b-lg">
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
        

        {/* Navigation Links */}
        <div className="flex items-center gap-4 font-sans">
          <Link
            // href="/questionPage/asker"
              href="/allquestions"
            className="text-white hover:text-gray-200 ml-2 mr-8 sm:mr-14"
          >
            All Questions
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-primary-300 hover:bg-primary-500 text-white rounded"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
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
