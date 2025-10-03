import Image from "next/image";
import whirl8 from "../../../../public/pages/offers/illustrations/Whirl 8.png";
import whirl5 from "../../../../public/pages/offers/illustrations/Whirl 5.png";
import whirl6 from "../../../../public/pages/offers/illustrations/Whirl 6.png";
import arrow13 from "../../../../public/pages/offers/illustrations/Arrow 13.png";
import underline4 from "../../../../public/pages/offers/illustrations/Underline 4.png";
import line9 from "../../../../public/pages/offers/illustrations/Line 9.png";
import underline3 from "../../../../public/pages/offers/illustrations/Underline 3.png";
import blob10 from "../../../../public/pages/offers/illustrations/Blob 10.png";


export const Offers = () => {
  return (
    <>
      <section className="relative flex flex-col items-center bg-background-light py-12 min-h-[400px] xl:min-h-[600px] ">
        {/* Whirl 8 */}
        <div className="absolute z-0 w-[72px] sm:w-[190px] top-[145.1px] right-[2%] sm:top-[210px] aspect-square">
          <Image src={whirl8} alt="Whirl 8" fill />
        </div>

        {/*Whirl 5 */}

        <div className="absolute h-[98px] w-[59px]  left-0 top-[400.64px] sm:top-[700px] lg:hidden ">
          <Image src={whirl5} alt="Whirl 5" fill />
        </div>

        {/*whirl 6 */}
        <div className="absolute h-[125px] w-[131px] bottom-0 left-3 z-0 hidden lg:block">
          <Image src={whirl6} alt="Whirl 6" fill />
        </div>

        {/*Arrow 13*/}
        <div
          className="absolute w-[28px] h-[77px] sm:w-[50px] sm:h-[100px] top-[370px] right-[18%]
        sm:top-[680px] lg:hidden aspect-square"
        >
          <Image src={arrow13} alt="Arrow 13" fill />
        </div>

        <h2 className="text-4xl sm:text-6xl mb-4 font-bold  text-primary-900 ">
          What we offer for you
        </h2>
        <div className=" relative w-[311px] h-[26px] sm:w-[566px] mb-[50px] sm:mb-[95px]  ">
          <Image src={underline4} alt="Underline 4" fill />
        </div>
        <div className="flex justify-center flex-wrap gap-[30px] sm:gap-[60px] md:gap-[90px]  px-6">
          {/* Card 1 */}
          <div className="max-w-[250px] min-h-[160px] w-5/12 sm:max-w-[310px] sm:w-5/12 xl:min-h-[357px] xl:max-w-[357px] bg-secondary-100 shadow-lg rounded-lg p-6 text-center z-10">
            <h3 className=" text-primary-900 mb-4 sm:mb-10">
              <div className="relative inline-block">
                <div
                  className=" absolute h-[8.03px] w-[72.38px] top-[23px]
                -right-[10px] sm:w-[150px] sm:h-[21.42px] sm:top-[40px]
              "
                >
                  <Image src={line9} alt="Line 9" fill />
                </div>

                <span className="text-base sm:text-4xl relative z-20">
                  Solutions
                </span>
              </div>
            </h3>
            <p className="font-serif text-neutral-900 text-[7px]  sm:text-base  md:text-lg sm:mb-10 leading-[9px] sm:leading[24px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
          {/* Card 2 */}
          <div className="w-5/12 min-h-[160px] sm:max-w-[300px] sm:w-5/12 md:w-6/16 xl:min-h-[357px] xl:max-w-[357px] bg-secondary-100 shadow-lg rounded-lg p-6 text-center order-2 sm:order-3 z-10">
            <h3 className=" text-primary-900 mb-4 sm:mb-10">
              <span className="relative inline-block">
                <div className="absolute top-[23px] -left-[7px]  h-[4px] w-[74px]  sm:w-[170px] sm:top-[45px]    ">
                  <Image src={underline3} alt="Underline 3" fill />
                </div>
                <span className="text-base sm:text-4xl  relative z-20">
                  Community
                </span>
              </span>
            </h3>
            <p className="font-serif text-neutral-900 text-[7px]  sm:text-base  md:text-lg sm:mb-10 leading-[9px] sm:leading[24px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
          {/* Card 3 */}
          <div className="w-5/12 min-h-[160px] sm:max-w-[300px] sm:w-5/12 md:w-6/16 xl:min-h-[357px] xl:max-w-[357px] bg-white shadow-lg rounded-lg p-6 text-center order-3 sm:order-2 z-10">
            <h3 className=" text-primary-900 mb-4 sm:mb-10">
              <div className="relative inline-block">
                <div className="absolute top-[6px] -left-[20px] sm:-top-[0px] sm:-left-[40px] w-[105px] h-[17px] sm:h-[53px] sm:w-[230px] ">
                  <Image src={blob10} alt="Blob 10" fill />
                </div>

                <span className="text-base sm:text-4xl relative z-20">
                  Knowledge
                </span>
              </div>
            </h3>
            <p className="font-serif text-neutral-900 text-[7px]  sm:text-base  md:text-lg sm:mb-10 leading-[9px] sm:leading[24px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offers;
