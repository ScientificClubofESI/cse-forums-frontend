import Image from "next/image";

export default function FooterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
      </div>

      <footer  className="py-6 px-3 sm:py-10 sm:px-4 relative bg-slate-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#133149] text-3xl sm:text-5xl font-semibold mb-7">
            STILL HAVE <br />
            QUESTIONS ABOUT
          </h2>
          <div className="flex justify-center items-center gap-8 sm:gap-16 mb-6">
            <Image
              src="/footer/logo cse.svg"
              alt="CSE"
              width={100}
              height={140}
              className="sm:w-[143.02px] sm:h-[197.05px]"
            />
            <div className="relative">
              <Image
                src="/footer/subtract.svg"
                alt="Subtract"
                width={120}
                height={140}
                className="sm:w-[174.8px] sm:h-[188.25px]"
              />
              <div className="absolute -right-12 sm:-right-16 -top-8 sm:-top-12">
                <Image
                  src="/footer/Arrow 13.svg"
                  alt="Arrow"
                  width={70}
                  height={50}
                />
              </div>
            </div>
          </div>
          <h1 className="text-[#133149] font-sans font-semibold text-2xl sm:text-5xl text-center">
            CONTACT US
          </h1>

          <p className="text-[#262626] mb-4 sm:mb-6 font-serif font-extralight text-sm sm:text-base text-center mt-2">
            By email{" "}
            <a href="mailto:cse@esi.dz" className="text-blue-600 underline">
              cse@esi.dz
            </a>{" "}
            or on social media
          </p>
          <div className="flex justify-center space-x-8 sm:space-x-16">
            <a
              href="https://www.facebook.com/club.scientifique.esi/?locale=fr_FR"
              aria-label="Facebook"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out "
            >
              <Image
                src="/footer/facebook.svg"
                alt="Facebook"
                width={45}
                height={45}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://www.instagram.com/cse.club/"
              aria-label="Instagram"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src="/footer/instagram.svg"
                alt="Instagram"
                width={45}
                height={45}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://x.com/CSESI_Club"
              aria-label="Twitter"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src="/footer/twitter.svg"
                alt="Twitter"
                width={45}
                height={45}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCHgeF6ELJW0Pt1vYoAomCig"
              aria-label="YouTube"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src="/footer/youtube.svg"
                alt="YouTube"
                width={45}
                height={45}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/cse-club/"
              aria-label="LinkedIn"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src="/footer/linkedin.svg"
                alt="LinkedIn"
                width={45}
                height={45}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
