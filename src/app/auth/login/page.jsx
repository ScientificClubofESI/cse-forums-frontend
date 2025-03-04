"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "../../../../public/images/Subtract.png";
import pic from "../../../../public/images/Coding workshop-pana.png";
import email from "../../../../public/images/google_icone.png";
import linkedin from "../../../../public/images/linkedin icone.png";
import emailIcone from "../../../../public/images/emailIcone.png";
import userIcone from "../../../../public/images/userIcone.png";
import eyeclosed from "../../../../public/images/eye-closed.png";
<<<<<<< HEAD
import { useRouter } from "next/navigation"; // Correct import for App Router

=======
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231

export const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      email,
      password,
    };

    console.log("Sending userData:", userData);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful login, e.g., redirect to dashboard
        console.log('Login successful:', data);
        Cookies.set("token", data.token, { expires: 1, path: "/" });
        console.log("Stored token:", Cookies.get("token"));

        // You can redirect the user or set some global state here
        router.push("/"); // Redirect to home page
      } else {
        // Handle errors, e.g., show error message
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
=======
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("email value : ", email);
      console.log("password value : ", password);

      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 5);
        console.log("Login successful:", response.data);
        Cookies.set("token", response.data.token, { expires: expirationDate, path: "/" });
        Cookies.set(
          "cse_forums_refresh_token",
          response.data.data.refreshToken,
          { expires: 1, path: "/" }
        );
        console.log("Stored token:", Cookies.get("token"));
        // localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("userId", response.data.data.id);
        router.push("/");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
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
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
<<<<<<< HEAD
    <div className="flex flex-col w-full sm:flex-row h-full bg-background-light sm:min-h-full">

      <div className="flex flex-col items-center sm:items-stretch  w-full sm:w-1/2 h-full sm:h-full px-8 sm:px-36  pt-4 rounded-tr-none sm:rounded-tr-[80px]  ">

        <h1 className="text-primary-900 font-sans font-bold mb-12 sm:mb-16 text-2xl  sm:text-5xl ">Log In</h1>
        <form className="w-full" onSubmit={handleSubmit}>

          <div className="relative mb-10 sm:mb-16 w-full">
            <label className="block text-l font-sans font-bold text-primary-900 sm:text-2xl">Email</label>
=======
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
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
            <input
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
              type="text"
<<<<<<< HEAD
              value={email} // Added: Bind to email state
              onChange={(e) => setEmail(e.target.value)} // Added: Update email state
=======
              value={email}
              onChange={(e) => setEmail(e.target.value)}
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
            />
            <Image
              src={emailIcone}
              alt="Email Icon"
              className="absolute top-1/2 md:top-[45px] right-3 w-5 h-5"
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
<<<<<<< HEAD
              value={password} // Added: Bind to password state
              onChange={(e) => setPassword(e.target.value)} // Added: Update password state
=======
              value={password}
              onChange={(e) => setPassword(e.target.value)}
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
            />
            <Image
              src={eyeclosed}
              alt="Email Icon"
              className="absolute top-[45px] md:top-1/2 right-3 w-5 h-5"
            />
<<<<<<< HEAD
            <a href="dfghj" className="font-serif text-neutral-200 text-sm w-fit"> Forget your password?</a>
          </div>

          <div className="text-neutral-900 py-2">
            <label className="flex items-center text-l font-serif text-primary-900">
              <input type="checkbox" className="hidden peer" />
              <span className="text-white w-4 h-4 mr-2 border-2 p-2 border-orange-300 rounded-sm cursor-pointer flex items-center justify-center peer-checked:bg-orange-300 ">
                ✔
              </span>
=======
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
>>>>>>> 934c104f742bd557399bebb90f94bbdbb0580231
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

      <div className="w-full sm:w-1/2  h-full sm:h-full px-8 sm:px-36 pt-4 pb-16 sm:pb-36 bg-primary-900 rounded-tr-[40px] rounded-tl-[40px] sm:rounded-tr-none ">
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
