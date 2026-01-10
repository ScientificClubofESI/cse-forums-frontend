import Image from "next/image";
import image2 from "../../../../public/images/landing/about_image1.png";
import image1 from "../../../../public/images/landing/about_image2.png";
import image1S from "../../../../public/images/landing/About_Image1_small.png";
import image2S from "../../../../public/images/landing/About_Image2_small.png";
import underline from "../../../../public/images/illustrations/underline.svg"



const About = () => {
  return (
    <section className="h-fit w-full m-0 p-0 lg:pb-40 lg:pt-24 flex flex-col justify-between items-center gap-12 lg:gap-24 bg-background-light">
      <h1 className="font-sans font-semibold text-4xl lg:text-7xl lg:text-center leading-10 text-primary-900 md:mb-12">About</h1>     
      <div className="bg-primary-700 w-full h-full flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-20 px-8 lg:px-12 py-6 lg:py-14 relative ">
      <Image src={underline} alt="yellow underline" className="absolute -top-1 md:-top-4 right-10 w-1/2"/>
      <Image src={underline} alt="yellow underline"  className="absolute -bottom-1 md:-bottom-4 left-10 w-1/2"/>
        <div className=" relative w-full lg:w-1/2 flex flex-row lg:flex-col justify-between  items-center gap-4 lg:gap-8">
            <div className="hidden lg:block mb-16 absolute -top-36"> 
              <Image src={image1} alt="HackIn2023-image1" width={430} />
            </div>
            <div className="-z-10 hidden lg:block"> 
              <Image src={image1} alt="HackIn2023-image1" width={200} />
            </div>
            <div className="flex flex-col lg:gap-y-6 justify-between">
              <h1 className="font-sans font-semibold text-2xl lg:text-5xl leading-10 text-secondary-300 lg:text-center">CSE Club</h1>
              <p className="font-serif text-xs lg:text-3xl font-normal text-neutral-50 lg:text-center">The CSE Scientific Club of ESI is one of the leading student clubs in Algeria. Since 2008, it has been organizing major tech events and initiatives aimed at energizing student life while promoting innovation, learning, and collaboration. </p>
            </div>
            <div className="flex lg:hidden h-full"> 
              <Image src={image1S} alt="HackIn2023-image1" width={800} />
            </div>
            
        </div>

        <div className="relative w-full lg:w-1/2 flex flex-row lg:flex-col justify-between items-center gap-4 lg:gap-8 pb-8">
            <div className="lg:hidden"> 
              <Image src={image2S} alt="image1" width={800} />
            </div>
            <div className="flex flex-col lg:gap-y-6 justify-between ">
              <h1 className="font-sans font-semibold text-2xl lg:text-5xl leading-10 text-secondary-300 lg:text-center">CSE Forums</h1>
              <p className="font-serif text-xs lg:text-3xl font-normal text-neutral-50 lg:text-center">CSE Forums is a discussion platform dedicated to the Algerian tech community. It enables users to exchange ideas across various technology fields, ask questions, provide answers, and actively contribute to knowledge sharing. 
              </p>
            </div>
            <div className="-z-10 hidden lg:block"> 
              <Image src={image1} alt="HackIn2023-image1" width={200} />
            </div>
            <div className="hidden lg:block mt-16 absolute -bottom-36"> 
              <Image src={image2} alt="image2" width={430} />
            </div>

        </div>  
      </div>

    </section>
  ); 
};

export default About;
