"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images/Subtract.png";
import pic from "../../../../public/images/Coding workshop-pana.png";
import email from "../../../../public/images/google_icone.png";
import linkedin from "../../../../public/images/linkedin icone.png";
import emailIcone from "../../../../public/images/emailIcone.png";
import userIcone from "../../../../public/images/userIcone.png";

export const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);}
  return (
    <div className="flex flex-col  sm:flex-row h-screen  sm:min-h-screen">

      <div className="bg-background-light  w-screen sm:w-1/2 h-full sm:h-screen px-8 sm:px-36  pt-4 pb-4 sm:pb-36    ">

        <h1 className="text-neutral-900 font-sans mb-12 sm:mb-16 text-2xl  sm:text-4xl ">Log In</h1>
        <form>

          <div className=" relative mb-10 sm:mb-16">
            <label className="block text-l text-serif-1 text-neutral-900 sm:text-xl">Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              className=" mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-300 rounded-md text-serif-1 focus:outline-none"
              type="text"
            />
            <Image
              src={emailIcone}
              alt="Email Icon"
              className="absolute top-10 right-3 w-5 h-5"
            />
          </div>

          <div className="relative mb-4 sm:mb-16">
            <label className="block  text-serif-1 text-neutral-900 text-l sm:text-xl">Password</label>
            <input
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-300 text-serif-1 focus:outline-none"
              type={showPassword ? "text" : "password"}
            />
            <a href="dfghj" className="mt-4 text-neutral-100"> Forget your password?</a>
          </div>

          <div className="text-neutral-900 py-2">
            <label className="flex items-center block text-l text-serif-1 text-neutral-900 ">
              <input type="checkbox" className="appearance-none w-4 h-4 mr-2 border-2 border-orange-300 rounded-sm cursor-pointer checked:bg-orange-300 checked:checkmark-color-white " />
              Remember me next time
            </label>
          </div>

          <button className="w-full my-4 bg-secondary-500 text-white font-semibold rounded-md py-3 text-lg">
            Sign In
          </button>
        </form>

        <div className="flex justify-center mt-10 mb-4">
          <p className="flex items-center block text-l text-serif-1 text-neutral-900">Don't have an account?r</p>
          <a href="dfghj" className="ml-1 text-secondary-500">Sign Up</a>
        </div>
      </div>
      <div className="w-screen sm:w-1/2  h-full sm:h-screen px-8 sm:px-36 pt-4 pb-2 sm:pb-36 bg-primary-900 rounded-t-[40px] sm:rounded-t-none ">
        <div className="flex flex-row items-center">
          <Image src={logo} alt="logo" className="w-10 sm:w-12h-10 sm:h-12 mr-6" />
          <h1 className=" text-white font-sans text-3xl sm:text-4xl">CSE Forums</h1>
        </div>

        <div className="flex justify-center mt-10 sm:mt-20 mb-4 sm:mb-8  ">
          <Image src={pic} alt="Welcome illustration" className="w-36 sm:w-64  h-36 sm:h-64" />
        </div>
        <div className="text-center">
          <h2 className=" text-white font-serif text-xl sm:text-3xl">Welcome Back !</h2>
          <p className="text-white font-serif text-l sm:text-xl">Just a couple of clicks and we start</p>
        </div>
      </div>
    </div>
  )
}
export default LogIn
