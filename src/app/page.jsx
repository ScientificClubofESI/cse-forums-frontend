import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Hero from "./landing/hero";
import Offers from "./landing/offers";
import About from "./landing/about";
import Feedback from "./landing/feedback";
import Footer from "./landing/footer";
import  { Navbarsignedin } from "@/components/navbar/navbarsignedin";




export default function Home() {
  return (
    <div>
      <div className="bg-primary-100 font-serif text-xl">hey</div>
      <Navbar />
      {/* <Navbarsignedin /> */}
      <Hero />
      <Offers />
      <About />
      <Feedback />
      <Footer />
    </div>
  );
}
