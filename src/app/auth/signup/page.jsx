"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "../../../../public/icons/Subtract.png";
import pic from "../../../../public/images/illustrations/Code typing-sis.png";
import linkedin from "../../../../public/icons/linkedin icone.png";
import emailIcone from "../../../../public/icons/emailIcone.png";
import userIcone from "../../../../public/icons/userIcone.png";
import authApi from "@/lib/authApi";
import { useRouter } from "next/navigation";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();



  // to replace this with the hook
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authApi.post("/auth/signup", {
        username,
        email,
        password,
        fullname: fullName,
      });

      if (response.status === 201) {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 5);
        //console.log("signup successful:", response.data);
        Cookies.set("token", response.data.token, {
          expires: expirationDate,
          path: "/",
        });
        Cookies.set(
          "cse_forums_refresh_token",
          response.data.data.refreshToken,
          { expires: 1, path: "/" }
        );
        // //console.log("Stored token:", Cookies.get("token"));
        // localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("userId", response.data.data.id);
        router.push("/");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          error.response.data.message || "signup failed. Please try again."
        );
        //console.error("signyp failed:", error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
        //console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An unexpected error occurred. Please try again.");
        //console.error("Error:", error.message);
      }
    }
  };


  return (
    <div className="h-screen flex flex-col sm:flex-row bg-primary-900">

      <div className="sm:w-1/2 flex flex-col justify-start relative" style={{ backgroundColor: '#FFFBFE' }}>
        <div className="flex flex-col pt-6 justify-between bg-primary-900 sm:rounded-tr-[80px] rounded-bl-[40px] rounded-br-[40px] sm:rounded-bl-none  sm:rounded-br-none rounded-tl-none px-8 sm:px-36 min-h-full pb-6 sm:pb-24">
          <div className="flex flex-row items-start">
            <Image
              src={logo}
              alt="logo"
              className="w-10 sm:w-12 h-10 sm:h-12 mr-6"
            />
            <h1 className=" text-white font-sans text-3xl sm:text-4xl">
              CSE Forums
            </h1>
          </div>

          <div className="flex flex-col sm:mb-20">
            <div className="flex justify-center mt-10 sm:mt-20 mb-4 sm:mb-8">
              <Image
                src={pic}
                alt="Welcome illustration"
                className="w-36 sm:w-64 h-36 sm:h-64"
              />
            </div>
            <div className="text-center w-full pb-4">
              <h2 className=" text-white font-serif text-xl sm:text-3xl">
                Welcome aboard, my friend!
              </h2>
              <p className="text-white font-serif text-l sm:text-xl">
                Just a couple of clicks and we start.
              </p>
            </div>
          </div>
          <div className="hidden sm:block"></div>
        </div>
      </div>


      <div className="sm:w-1/2 flex flex-col justify-start relative bg-primary-900">
        <div className="sm:rounded-bl-[80px] sm:px-36 min-h-full px-8 flex flex-col justify-start pb-24" style={{ backgroundColor: '#FFFBFE' }}>
          <h1 className="text-primary-900 font-sans font-bold text-2xl text-center sm:text-[44px] mt-16 mb-16">
            Create New Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-6">
              <label className="block font-serif text-primary-900 text-l sm:text-xl font-extrabold">
                Full name
              </label>
              <input
                name="name"
                placeholder="Enter your full name"
                className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
                type="text"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
              />
            </div>

            <div className="relative mb-4 sm:mb-6 ">
              <label className="block font-serif text-primary-900 text-l sm:text-xl font-extrabold">
                Username
              </label>
              <input
                name="name"
                placeholder="Enter your username"
                className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <Image
                src={userIcone}
                alt="user Icon"
                className="absolute top-10 right-3 w-5 h-5"
              />
            </div>

            <div className=" relative mb-4 sm:mb-6">
              <label className="block text-l font-serif font-extrabold text-primary-900 sm:text-xl">
                Email
              </label>
              <input
                name="email"
                placeholder="Enter your email"
                className=" mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Image
                src={emailIcone}
                alt="Email Icon"
                className="absolute top-10 right-3 w-5 h-5"
              />
            </div>

            <div className="relative mb-4 sm:mb-6">
              <label className="block font-serif text-primary-900 text-l sm:text-xl font-extrabold ">
                Password
              </label>
              <input
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 font-serif focus:outline-none rounded-md "
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-neutral-900 py-2">
              <label className="items-center text-l font-serif text-neutral-900 ">
                <input
                  type="checkbox"
                  className="bg-white appearance-none w-4 h-4 mr-2 border-2 border-orange-300 rounded-sm cursor-pointer checked:bg-orange-300 checked:checkmark-color-white "
                />
                I agree all statements in
                <a href="trm" className="ml-1 text-secondary-500">
                  {" "}
                  Terms of service
                </a>
                {/**TODO link to terms of service page*/}
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

          <div className="flex flex-row items-center space-x-4 gap-4">
            <button className="flex items-center w-full justify-center bg-white border border-neutral-300 py-2 rounded-md text-neutral-300">
              <Image
                src={emailIcone}
                alt="Google Icon"
                className="w-5 h-5 mr-3"
              />
              Google
            </button>
            <button className="flex items-center w-full justify-center bg-white border border-neutral-300 py-2 rounded-md text-neutral-300">
              <Image
                src={linkedin}
                alt="LinkedIn Icon"
                className="w-5 h-5 mr-3"
              />
              LinkedIn
            </button>
          </div>

          <div className="flex justify-center items-center mt-2">
            <p className="flex text-l font-serif text-neutral-500">
              Already a member ?
            </p>
            <Link href="/auth/login" className="ml-2 text-secondary-500">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
