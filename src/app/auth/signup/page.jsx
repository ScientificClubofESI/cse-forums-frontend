"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "../../../../public/images/Subtract.png";
import pic from "../../../../public/images/Code typing-sis.png";
import google from "../../../../public/images/google_icone.png";
import linkedin from "../../../../public/images/linkedin icone.png";
import emailIcone from "../../../../public/images/emailIcone.png";
import userIcone from "../../../../public/images/userIcone.png";
import { useRouter } from "next/navigation"; // Correct import for App Router

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setError("You must agree to the Terms of Service.");
      return;
    }
    setError("");

    //console.log("Form submitted:", formData);
  
    const userData = {
      username,
      fullname,
      email,
      password,
      title: "x", // Empty string for fields not in the form
      bio: "x",
      facebook_id: "x",
      instagram_id: "x",
      github_id: "x",
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful signup, e.g., redirect to login or dashboard
        console.log('Signup successful:', data);
        Cookies.set("token", data.token, { expires: 1 }); // Store token for 7 days
        router.push("/"); // Redirect to home page
      } else {
        // Handle errors, e.g., show error message
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col sm:flex-row h-full sm:min-h-full bg-background-light">
      <div className="w-screen sm:w-1/2 px-8 sm:px-36 pt-4 pb-4 sm:pb-36 bg-primary-900 sm:rounded-tr-[40px] rounded-br-[40px] rounded-bl-[40px] sm:rounded-br-[40px] sm:rounded-bl-none rounded-tl-none">
        <div className="flex flex-row items-center">
          <Image src={logo} alt="logo" className="w-10 sm:w-12 h-10 sm:h-12 mr-6" />
          <h1 className=" text-white font-sans text-3xl sm:text-4xl">CSE Forums</h1>
        </div>

        <div className="flex justify-center mt-10 sm:mt-20 mb-4 sm:mb-8">
          <Image src={pic} alt="Welcome illustration" className="w-36 sm:w-64 h-36 sm:h-64" />
        </div>
        <div className="text-center w-full pb-4">
          <h2 className=" text-white font-serif text-xl sm:text-3xl">Welcome aboard, my friend!</h2>
          <p className="text-white font-serif text-l sm:text-xl">Just a couple of clicks and we start.</p>
        </div>
      </div>

      <div className="w-full sm:w-1/2 h-full sm:h-full px-8 sm:px-36 py-4 sm:pb-36">

        <h1 className="w-full text-primary-900 font-sans font-bold my-16 text-2xl  sm:text-5xl">Create New Account</h1>
        <form onSubmit={handleSubmit}>
  {/* Full Name Input */}
  <div className="mb-4 sm:mb-6">
    <label className="block font-serif text-primary-900 text-l sm:text-xl font-extrabold">Full name</label>
    <input
      name="fullname"
      placeholder="Enter your full name"
      className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
      type="text"
      value={fullname} // Bind to fullname state
      onChange={(e) => setFullname(e.target.value)} // Update fullname state
    />
  </div>

  {/* Username Input */}
  <div className="relative mb-4 sm:mb-6">
    <label className="block font-serif text-primary-900 text-l sm:text-xl font-extrabold">Username</label>
    <input
      name="username"
      placeholder="Enter your username"
      className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
      type="text"
      value={username} // Bind to username state
      onChange={(e) => setUsername(e.target.value)} // Update username state
    />
    <Image
      src={userIcone}
      alt="user Icon"
      className="absolute top-10 right-3 w-5 h-5"
    />
  </div>

  {/* Email Input */}
  <div className="relative mb-4 sm:mb-6">
    <label className="block text-l font-serif font-extrabold text-primary-900 sm:text-xl">Email</label>
    <input
      name="email"
      placeholder="Enter your email"
      className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 rounded-md font-serif focus:outline-none"
      type="text"
      value={email} // Bind to email state
      onChange={(e) => setEmail(e.target.value)} // Update email state
    />
    <Image
      src={emailIcone}
      alt="Email Icon"
      className="absolute top-10 right-3 w-5 h-5"
    />
  </div>

  {/* Password Input */}
  <div className="relative mb-4 sm:mb-6">
    <label className="block font-serif text-primary-900 text-l sm:text-xl font-extrabold">Password</label>
    <input
      name="password"
      placeholder="Enter your password"
      className="mt-1 w-full text-base ring-1 ring-neutral-300 p-2 text-neutral-900 font-serif focus:outline-none rounded-md"
      type={showPassword ? "text" : "password"}
      value={password} // Bind to password state
      onChange={(e) => setPassword(e.target.value)} // Update password state
    />
  </div>

  {/* Terms of Service Checkbox */}
  <div className="text-neutral-900 py-2">
    <label className="flex items-center text-l font-serif text-primary-900">
      <input type="checkbox" className="hidden peer" checked={isChecked} onChange={handleCheckboxChange}/>
      <span className="text-white w-4 h-4 mr-2 border-2 p-2 border-orange-300 rounded-sm cursor-pointer flex items-center justify-center peer-checked:bg-orange-300">
        ✔
      </span>
      I agree all statements in <a href="trm" className="ml-1 text-secondary-500"> Terms of service</a>
    </label>
  </div>

  {/* Sign Up Button */}
  <button type="submit" className="w-full my-3 bg-secondary-500 text-white font-semibold rounded-md py-3 text-lg">
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
            <Image src={google} width={50} alt="Google Icon" className="w-5 h-5 mr-3" />
            Google
          </button>
          <button className="flex items-center w-full justify-center bg-white border border-neutral-300 py-2 rounded-md text-neutral-300">
            <Image src={linkedin} width={50}  alt="LinkedIn Icon" className="w-5 h-5 mr-3" />
            LinkedIn
          </button>
        </div>

        <div className="flex justify-center items-center mt-6">
          <p className="flex text-l font-serif text-neutral-500">Already a member ?</p>
          <a href="dfghj" className="ml-2 text-secondary-500">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
