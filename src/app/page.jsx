import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Hero from "./landing/hero";
import Offers from "./landing/offers";
import About from "./landing/about";
import Feedback from "./landing/feedback";
import Footer from "./landing/footer";
<<<<<<< HEAD
import SignUp from "./auth/signup/page";
import LogIn from "./auth/login/page";
=======
import  { Navbarsignedin } from "@/components/navbar/navbarsignedin";


>>>>>>> ef6e2b33e932ac3495f88200dd135aa945223b58


export default function Home() {
  return (
    <div>
<<<<<<< HEAD
=======
      <div className="bg-primary-100 font-serif text-xl">hey</div>
      {/* <Navbar /> */}
      <Navbarsignedin />
      <Hero />
      <Offers />
      <About />
      <Feedback />
>>>>>>> ef6e2b33e932ac3495f88200dd135aa945223b58
      <Footer />
    </div>
  );
}
