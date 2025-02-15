import { SearchNormal1 } from "iconsax-react";
import Image from "next/image";

const Hero = () => {
  return (

    <div className="relative w-full bg-background-light py-16">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 hidden sm:block">
        <Image
          src="/images/bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 w-full h-full z-0 block sm:hidden">
        <Image
          src="/images/bgr.svg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>



      {/* Main content */}
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Logo/Title */}
        <h1 className="mb-10 text-5xl sm:text-8xl font-bold text-primary-900 font-sans">CSE Forums</h1>

        {/* Welcome message */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-semibold text-primary-500 font-sans">Hello my friend!</h2>
          <p className="text-lg sm:text-3xl font-normal text-[#0C2239] font-serif">It's a good day to ask a question, isn't it?</p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-4xl flex items-center rounded-lg border-none py-3 pl-4 bg-white">
          <SearchNormal1 size="32" color="black"/>
            <input
              type="text"
              placeholder="Search CSE Forums ..."
              className="w-full border-none pl-2 focus:outline-none font-serif text-sm sm:text-2xl font-light"
            />
            
          </div>
        </div>

        {/* CTA Button */}
        <button className="rounded-lg max-w-5xl bg-secondary-500 px-8 py-3 text-lg font-medium font-sans text-white transition-colors hover:bg-orange-600">
          Ask a Question?
        </button>
      </div>
    </div>
  );
};

export default Hero;