"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/icons/Subtract.png";
import pic from "../../../../public/images/illustrations/Code typing-sis.png";
import linkedin from "../../../../public/icons/linkedin icone.png";
import emailIcone from "../../../../public/icons/emailIcone.png";
import userIcone from "../../../../public/icons/userIcone.png";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import authApi from "@/lib/authApi";


// the signup hook
import { useSignup } from "@/hooks/Auth";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [googleError, setGoogleError] = useState("");
  const router = useRouter();

  const { signup, loading, error, clearError } = useSignup();


  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError(); // Clear any previous errors
    setGoogleError("");

    const userData = {
      username,
      email,
      password,
      fullName,
    };

    const result = await signup(userData);

    if (result.success) {
      // Signup successful - redirect is handled by the hook
      console.log('Signup successful');
    } else {
      // Error is already set by the hook
      console.log('Signup failed:', result.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-primary-900">

      <div className="sm:w-1/2 flex flex-col justify-start relative" style={{ backgroundColor: '#FFFBFE' }}>
        <div className="flex flex-col pt-6 justify-between bg-primary-900 sm:rounded-tr-[80px] rounded-bl-[40px] rounded-br-[40px] sm:rounded-bl-none  sm:rounded-br-none rounded-tl-none px-8 sm:px-36 min-h-full pb-6 sm:pb-24">
          <div className="flex flex-row items-start cursor-pointer" onClick={() => router.push('/')}>
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
          <h1 className="text-primary-900 font-sans font-bold text-2xl text-center sm:text-[44px] mt-14 mb-14">
            Create New Account
          </h1>
          <form onSubmit={handleSubmit}>
            {(error || googleError) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error || googleError}
              </div>
            )}
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

            <div className="text-neutral-900 py-1">
                <p
                  className="font-serif text-neutral-900 leading-relaxed text-center"
                >By creating an account, you agree to follow our general terms of good and respectful use of this application.
                </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full my-3 bg-secondary-500 text-white font-semibold rounded-md py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex flex-row items-center justify-center">
            <div className="w-12 h-0.5 bg-neutral-300"></div>
            <p className="mx-4 text-lg font-serif text-neutral-300">Or</p>
            <div className="w-12 h-0.5 bg-neutral-300"></div>
          </div>

          <div className="flex flex-row items-center justify-center mt-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  setGoogleError("");
                  await authApi.post(
                    "/auth/signup",
                    { provider: "google", token: credentialResponse.credential }
                  );
                  window.location.href = "/";
                } catch (e) {
                  const errorMessage = e.response?.data?.message || "Google signup failed. Please try again.";
                  setGoogleError(errorMessage);
                }
              }}
              onError={() => setGoogleError("Google signup failed. Please try again.")}
              useOneTap
            />
          </div>

          <div className="flex justify-center items-center mt-2">
            <p className="flex text-l font-serif text-neutral-500">
              Already a member ?
            </p>
            <a href="/auth/login" className="ml-2 text-secondary-500">
              Sign In
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
