"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images/Subtract.png";
import pic from "../../../../public/images/Coding workshop-pana.png";
import email from "../../../../public/images/google_icone.png";
import linkedin from "../../../../public/images/linkedin icone.png";
import emailIcone from "../../../../public/images/emailIcone.png";
import userIcone from "../../../../public/images/userIcone.png";
import eyeclosed from "../../../../public/images/eye-closed.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("email value : ",email);
      console.log("password value : " , password);
      
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        Cookies.set("token", response.data.token, { expires: 1, path: "/" });
        console.log("Stored token:", Cookies.get("token"));
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("userId", response.data.data.id);
        router.push("/");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || "Login failed. Please try again.");
        console.error("Login failed:", error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An unexpected error occurred. Please try again.");
        console.error("Error:", error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col w-full sm:flex-row h-screen  sm:min-h-screen">
      <div className="flex flex-col items-center sm:items-stretch bg-background-light  w-full sm:w-1/2 h-full sm:h-screen px-8 sm:px-36  pt-4 pb-4 sm:pb-36 rounded-tr-none sm:rounded-tr-[80px]  ">
        <h1 className="text-primary-900 font-sans font-bold mb-12 sm:mb-16 text-2xl  sm:text-5xl ">
          Log In
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className=" relative mb-10 sm:mb-16 w-full">
            <label className="block text-l font-sans font-bold text-primary-900 sm:text-2xl">
              Email
            </label>
            <input
              name="email"
              placeholder="Enter your email"
              className=" mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Image
              src={emailIcone}
              alt="Email Icon"
              className="absolute top-1/2 right-3 w-5 h-5"
            />
          </div>

          <div className="relative mb-4 sm:mb-16 flex flex-col gap-y-2 w-full">
            <label className="block font-sans font-bold text-primary-900  text-l sm:text-2xl">
              Password
            </label>
            <input
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 font-serif focus:outline-none rounded-md"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image
              src={eyeclosed}
              alt="Email Icon"
              className="absolute top-1/2 right-3 w-5 h-5"
            />
            <a href="dfghj" className="font-serif text-neutral-200 text-sm">
              {" "}
              Forget your password?
            </a>
          </div>

          <div className="text-neutral-900 py-2 ">
            <label className="flex items-center text-l font-serif text-primary-900 ">
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 mr-2 border-2 border-orange-300 bg-white rounded-sm cursor-pointer checked:bg-orange-300 checked:checkmark-color-white "
              />
              Remember me next time
            </label>
          </div>

          <button className="w-full my-4 bg-secondary-500 text-white font-semibold rounded-md py-3 text-lg">
            Sign In
          </button>
        </form>

        <div className="flex justify-center items-center mb-10">
          <p className="flex text-l font-serif text-neutral-500">
            Don't have an account?
          </p>
          <a href="dfghj" className="font-serif ml-2 text-secondary-500">
            Sign Up
          </a>
        </div>
      </div>
      <div className="w-screen sm:w-1/2  h-full sm:h-screen px-8 sm:px-36 pt-4 pb-16 sm:pb-36 bg-primary-900 rounded-tr-[40px] rounded-tl-[40px] sm:rounded-tr-none ">
        <div className="flex flex-row items-center">
          <Image
            src={logo}
            alt="logo"
            className="w-8 sm:w-12h-10 sm:h-12 mr-6"
          />
          <h1 className=" text-white font-sans text-2xl sm:text-4xl">
            CSE Forums
          </h1>
        </div>

        <div className="flex justify-center mt-10 sm:mt-20 mb-4 sm:mb-8  ">
          <Image
            src={pic}
            alt="Welcome illustration"
            className="w-36 sm:w-64  h-36 sm:h-64"
          />
        </div>
        <div className="text-center">
          <h2 className=" text-white font-serif text-xl sm:text-3xl">
            Welcome Back !
          </h2>
          <p className="text-white font-serif text-l sm:text-xl">
            Just a couple of clicks and we start
          </p>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
