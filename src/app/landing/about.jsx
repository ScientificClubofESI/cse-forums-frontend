import Image from "next/image";
import image1 from "../../../public/About_image1.png";
import image2 from "../../../public/About_image2.png";
import image1S from "../../../public/About_Image1_small.png";
import image2S from "../../../public/About_Image2_small.png";
import lines1 from "../../../public/lines1.svg";
import lines2 from "../../../public/lines2.svg";




const About = () => {
  return (
    <section className="h-fit w-full m-0 p-0 flex flex-col justify-between items-center gap-12 lg:gap-20">
      <h1 className="font-sans font-semibold text-4xl lg:text-7xl lg:text-center leading-10 text-primary-900">About</h1>     
      <div className="bg-primary-700 h-fit lg:h-[800px] w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 px-8 lg:px-12 py-6 lg:py-4">
        <div className=" w-full lg:w-1/2 flex flex-row lg:flex-col justify-between items-center gap-4 lg:gap-8">
            <div className="hidden lg:block relative mb-16"> 
              <Image src={image1} alt="HackIn2023-image1" width={430} />
            </div>
            <div className="mt-4">
              <h1 className="font-sans font-semibold text-2xl lg:text-5xl leading-10 text-secondary-300 lg:text-center">CSE Club</h1>
              <p className="font-serif text-xs lg:text-3xl font-normal text-neutral-50 lg:text-center">Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit.Urna aenean consequat pretium, tempus ullamcorper placerat vitae.
                Proin urna ac nunc, vulputate cras velit lacus. </p>
            </div>
            <div className="block lg:hidden"> 
              <Image src={image1S} alt="HackIn2023-image1" width={800} />
            </div>
            {/*<Image src={lines1} alt="lines-svg" width="430"/>*/}
        </div>

        <div className="w-full lg:w-1/2 flex flex-row lg:flex-col justify-between items-center gap-4 lg:gap-8">
            {/*<Image src={lines2} alt="lines-svg" width="430"/>*/}
            <div className="block lg:hidden"> 
              <Image src={image2S} alt="image1" width={800} />
            </div>
            <div className="mt-4">
              <h1 className="font-sans font-semibold text-2xl lg:text-5xl leading-10 text-secondary-300 lg:text-center">CSE Forums</h1>
              <p className="font-serif text-xs lg:text-3xl font-normal text-neutral-50 lg:text-center">Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit. Urna aenean consequat pretium, tempus ullamcorper placerat vitae. Proin urna ac nunc, vulputate cras velit lacus. 
              </p>
            </div>
            <div className="hidden lg:block relative mt-16"> 
              <Image src={image2} alt="image2" width={430} />
            </div>
        </div>
         
      </div>

    </section>
  ); 
};

export default About;
