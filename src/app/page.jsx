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
import  { Navbarsignedin } from "@/components/navbar/navbarsignedin";
=======
import Profil from "./profile/page"

>>>>>>> 89d8294b7b382e60e2d839744dca2747bde3f386


export default function Home() {
  return (
    <div>
<<<<<<< HEAD
      {/* <Navbar /> */}
      <Navbarsignedin />
      <Hero />
      <Offers />
      <About />
      <Feedback />
      <Footer />
=======

      <Profil/>

>>>>>>> 89d8294b7b382e60e2d839744dca2747bde3f386
    </div>
  );
}
