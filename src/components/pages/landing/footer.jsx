import Image from "next/image";
import logocse from "../../../../public/pages/footer/icons/logocse.svg";
import subtract from "../../../../public/pages/footer/icons/Subtract.svg";
import arrow13 from "../../../../public/pages/footer/illustrations/Arrow13.svg";
import facebook from "../../../../public/pages/footer/icons/facebook.svg";
import instagram from "../../../../public/pages/footer/icons/instagram.svg";
import twitter from "../../../../public/pages/footer/icons/twitter.svg";
import youtube from "../../../../public/pages/footer/icons/youtube.svg";
import linkedin from "../../../../public/pages/footer/icons/linkedin.svg";

export default function FooterPage() {
  return (
    <div className="min-h-full flex flex-col bg-background-light pt-[5%]">
      <div className="flex-grow"></div>

      <footer className="py-6 px-3 sm:py-10 sm:px-4 relative bg-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#133149] text-3xl sm:text-5xl font-semibold mb-7">
            STILL HAVE <br />
            QUESTIONS ABOUT
          </h2>
          <div className="flex justify-center items-center gap-8 sm:gap-16 mb-10">
            <Image
              src={logocse}
              alt="CSE"
              width={100}
              height={140}
              style={{ width: "auto", height: "auto" }}
              className="sm:w-[143.02px] sm:h-[197.05px]"
            />
            <div className="relative">
              <Image
                src={subtract}
                alt="Subtract"
                width={120}
                height={140}
                style={{ width: "auto", height: "auto" }}
                className="sm:w-[174.8px] sm:h-[188.25px]"
              />
              <div className="absolute -right-9 sm:-right-20 -top-16 sm:-top-24">
                <Image
                  src={arrow13}
                  alt="Arrow"
                  width={36.73}
                  height={112.1}
                  style={{ width: "auto", height: "auto" }}
                  className="sm:w-[73.45px] sm:h-[204.21px]"
                />
              </div>
            </div>
          </div>
          <h1 className="text-[#133149] font-sans font-semibold text-2xl sm:text-5xl text-center mb-4 sm:mb-6">
            CONTACT US
          </h1>

          <p className="text-[#262626] font-serif font-extralight text-sm sm:text-base text-center mt-2 mb-6">
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
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src={facebook}
                alt="Facebook"
                width={45}
                height={45}
                style={{ width: "auto", height: "auto" }}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://www.instagram.com/cse.club/"
              aria-label="Instagram"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src={instagram}
                alt="Instagram"
                width={45}
                height={45}
                style={{ width: "auto", height: "auto" }}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://x.com/CSESI_Club"
              aria-label="Twitter"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src={twitter}
                alt="Twitter"
                width={45}
                height={45}
                style={{ width: "auto", height: "auto" }}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCHgeF6ELJW0Pt1vYoAomCig"
              aria-label="YouTube"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src={youtube}
                alt="YouTube"
                width={45}
                height={45}
                style={{ width: "auto", height: "auto" }}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/cse-club/"
              aria-label="LinkedIn"
              className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <Image
                src={linkedin}
                alt="LinkedIn"
                width={45}
                height={45}
                style={{ width: "auto", height: "auto" }}
                className="sm:w-[63px] sm:h-[63px]"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
