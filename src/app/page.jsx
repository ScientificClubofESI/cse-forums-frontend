import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Hero from "./landing/hero";
import Offers from "./landing/offers";
import About from "./landing/about";
import Feedback from "./landing/feedback";
import Footer from "./landing/footer";
import SignUp from "./auth/signup/page";
import LogIn from "./auth/login/page";


export default function Home() {
  return (
    <div>
      <LogIn/>
    </div>
  );
}
