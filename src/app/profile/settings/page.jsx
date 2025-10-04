"use client";

import React, { useState } from "react";
import Image from "next/image";
import userpicture from "../../../../public/images/avatars/userpicture.svg"; // Importing a user picture (SVG file)
import api from "@/lib/api";
import { useEffect } from "react";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import Navbar from "@/components/navbar/navbar";
import Link from "next/link";

// Import the hooks
import useAuth, { useUserProfile } from "@/hooks/Auth";


export const Settings = () => {

  console.log("Rendering Settings component");
  // Authentication and profile hooks
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  console.log('User from useAuth:', user);
  const { profile, loading: profileLoading, error: profileError, updateProfile } = useUserProfile(userId);
  console.log('Profile from useUserProfile:', profile);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
  });

  const isInitialized = React.useRef(false);

  // Update form data when profile is loaded (only once)
  useEffect(() => {
    if (profile && !isInitialized.current) {
      console.log(profile);
      setFormData({
        fullName: profile.fullname || "",
        userName: profile.username || "",
        email: profile.email || "",
      });
      isInitialized.current = true; // Mark as initialized
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const result = await updateProfile({
      username: formData.userName,
      email: formData.email,
      fullname: formData.fullName, // Include full name if your backend supports it
    });

    if (result.success) {
      console.log("Profile updated successfully!");
    } else {
      console.log("Failed to update profile: " + result.error);
    }
  };

  return (
    <>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="bg-gray-100 h-screen flex flex-col items-center justify-start p-4 sm:p-8 sm:px-36">
        {/* Title */}
        <div className="w-full mt-6">
          <h1 className="text-[20px] sm:text-5xl font-medium text-[#262626] mb-8 sm:mb-12 text-start">
            My Informations
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white w-full p-6 sm:p-8 rounded-lg shadow-xl flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* User Picture Section */}
          <div className="flex justify-center sm:justify-start">
            <UserPicture />
          </div>

          {/* Vertical Line for Desktop */}
          <div className="hidden sm:block border-l border-neutral-300 h-auto mx-4"></div>

          {/* Form Section */}
          <div className="flex flex-col gap-6 flex-grow">
            <FormInput
              label="Full name :"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              name="fullName"
              disabled
            />
            <FormInput
              label="User name :"
              type="text"
              placeholder="Enter your user name"
              value={formData.userName}
              onChange={handleInputChange}
              name="userName"
            />
            <FormInput
              label="Email :"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
            />

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button className="bg-[#2E75AD] text-white text-sm sm:text-base font-medium rounded py-3 px-16 w-full sm:w-auto" disabled>
                Change Password
              </button>

              <button
                onClick={handleSave}
                disabled={profileLoading}
                className="bg-[#FF902E] text-white text-sm sm:text-base font-medium rounded py-3 px-16 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {profileLoading ? 'Saving...' : 'Save & Go Back'}
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// Subcomponent: User Picture Section
  const UserPicture = () => (
    <div className="flex flex-col items-center sm:items-start sm:mr-10 sm:ml-10 sm:mb-10">
      <Image
        src={userpicture}
        alt="User Picture"
        className="md:h-[11rem] md:w-[11rem] w-[113px] h-[113px]  rounded-full"
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="upload-picture"
        disabled
      />
      {/* Change Picture Button */}
      <label
        htmlFor="upload-picture"
        className="text-[#2E75AD] font-medium md:text-xl text-sm	md:ml-[1.1rem] cursor-pointer mt-4 text-center sm:text-left sm:ml-[2.05rem] sm:mt-3 font-serif md:font-bold"
      >
        Change Picture
      </label>
      {/* Space under the button only in mobile version */}
      <div className="sm:hidden mt-4 w-[20.2rem] mb-[1rem]">
        <hr className="border-t border-neutral-500" />
      </div>
    </div>
  );

  // Subcomponent: Form Input
  const FormInput = ({ label, type, placeholder, value, onChange, name, disabled }) => (
    <div className="flex items-center gap-4 w-full">
      <label className="text-[#262626] md:w-[5.6rem] w-[5.5rem] text-left font-serif font-medium sm:font-bold">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name} // Pass name here
        className="placeholder-opacity-100 bg-gray-100 shadow-sm rounded-[4px] px-4 py-4 text-sm placeholder:text-[#262626] placeholder:font-light sm:placeholder:font-light placeholder:font-serif  flex-grow "
        disabled={disabled}
      />
    </div>
  );


  
export default Settings;
