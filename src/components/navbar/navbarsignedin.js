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
