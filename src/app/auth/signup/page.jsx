"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images/Subtract.png";
import pic from "../../../../public/images/Code typing-sis.png";
import email from "../../../../public/images/google_icone.png";
import linkedin from "../../../../public/images/linkedin icone.png";
import emailIcone from "../../../../public/images/emailIcone.png";
import userIcone from "../../../../public/images/userIcone.png";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col  sm:flex-row h-screen  sm:min-h-screen">
      <div className="w-screen sm:w-1/2  h-full sm:h-screen px-8 sm:px-36 pt-4 pb-4 sm:pb-36 bg-primary-900 rounded-b-[40px] sm:rounded-b-none ">
        <div className="flex flex-row items-center">
          <Image src={logo} alt="logo" className="w-10 sm:w-12h-10 sm:h-12 mr-6" />
          <h1 className=" text-white font-sans text-3xl sm:text-4xl">CSE Forums</h1>
        </div>

        <div className="flex justify-center mt-10 sm:mt-20 mb-4 sm: mb-8  ">
          <Image src={pic} alt="Welcome illustration" className="w-36 sm:w-64  h-36 sm:h-64" />
        </div>
        <div className="text-center">
          <h2 className=" text-white font-serif text-xl sm:text-3xl">Welcome aboard, my friend!</h2>
          <p className="text-white font-serif text-l sm:text-xl">Just a couple of clicks and we start.</p>
        </div>
      </div>

      <div className="bg-background-light  w-screen sm:w-1/2 h-full sm:h-screen px-8 sm:px-36  pt-4 pb-4 sm:pb-36    ">

        <h1 className="text-neutral-900 font-sans mb-4 text-2xl  sm:text-4xl mb-8">Create New Account</h1>
        <form>

          <div className="mb-4 sm:mb-6">
            <label className="block  text-serif-1 text-neutral-900 text-l sm:text-xl">Full name</label>
            <input
              name="name"
              placeholder="Enter your full name"
              className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-300 rounded-md text-serif-1 focus:outline-none"
              type="text"
            />
          </div>

          <div className="relative mb-4 sm:mb-6 ">
            <label className="block  text-serif-1 text-neutral-900 text-l sm:text-xl">Username</label>
            <input
              name="name"
              placeholder="Enter your username"
              className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-300 rounded-md text-serif-1 focus:outline-none"
              type="text"
            />
            <Image
              src={userIcone}
              alt="user Icon"
              className="absolute top-10 right-3 w-5 h-5"
            />
          </div>

          <div className=" relative mb-4 sm:mb-6">
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

          <div className="relative mb-4 sm:mb-6">
            <label className="block  text-serif-1 text-neutral-900 text-l sm:text-xl">Password</label>
            <input
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-300 text-serif-1 focus:outline-none"
              type={showPassword ? "text" : "password"}
            />
          </div>

          <div className="text-neutral-900 py-2">
            <label className="flex items-center block text-l text-serif-1 text-neutral-900 ">
              <input type="checkbox" className="appearance-none w-4 h-4 mr-2 border-2 border-orange-300 rounded-sm cursor-pointer checked:bg-orange-300 checked:checkmark-color-white " />
              I agree all statements in <a href="trm" className="ml-1 text-secondary-500"> Terms of service</a>
            </label>
          </div>

          <button className="w-full my-3 bg-secondary-500 text-white font-semibold rounded-md py-3 text-lg">
            Sign Up
          </button>
        </form>

        <div className="flex flex-row items-center justify-center">
          <div className="w-12 h-0.5 bg-neutral-300"></div>
          <p className="mx-4 text-lg font-serif text-neutral-300">Or</p>
          <div className="w-12 h-0.5 bg-neutral-300"></div>
        </div>

        <div className="flex flex-row items-center mt-6 space-x-4">
          <button className="flex items-center w-full justify-center bg-white border border-neutral-300 py-2 rounded-md text-neutral-300">
            <Image src={email} alt="Google Icon" className="w-5 h-5 mr-3" />
            Google
          </button>
          <button className="flex items-center w-full justify-center bg-white border border-neutral-300 py-2 rounded-md text-neutral-300">
            <Image src={linkedin} alt="LinkedIn Icon" className="w-5 h-5 mr-3" />
            LinkedIn
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <p className="flex items-center block text-l text-serif-1 text-neutral-900">Already a member</p>
          <a href="dfghj" className="ml-1 text-secondary-500">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
