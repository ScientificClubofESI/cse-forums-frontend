"use client";

import React, { useState } from "react";
import Image from "next/image";
import userpicture from "./userpicture.svg"; // Importing a user picture (SVG file)
import api from "@/lib/api";
import { useEffect } from "react";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import Navbar from "@/components/navbar/navbar";
import Link from "next/link";

// Subcomponent: User Picture Section 
const UserPicture = ({ handleFileChange }) => (
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
      onChange={handleFileChange}
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
const FormInput = ({ label, type, placeholder, value, onChange, name }) => (
  <div className="flex items-center gap-4 w-full">
    <label className="text-[#262626] md:w-[5.6rem] w-[5.5rem] text-left font-serif font-medium sm:font-bold		">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name} // Pass name here
      className="opacity-100 placeholder-opacity-100 border border-gray-100 shadow-sm rounded px-4 py-2 text-sm placeholder:text-[#262626] placeholder:font-light sm:placeholder:font-light placeholder:font-serif  flex-grow focus:ring-2 focus:ring-[#2E75AD]"
      style={{ backgroundColor: "#fffbfe" }}
    />
  </div>
);

export const Settings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
  });
  const getUserProfile = async (userid) => {
    const response = await api.get(`/user/${userid}`);
    setFormData({
      fullName: response.data.data.fullname,
      userName: response.data.data.username,
      email: response.data.data.email,
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsAuthenticated(true);
      }

      getUserProfile(userId);
    }
  }, []);
  // State for form inputs

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    // Logic for handling file upload (e.g., updating state or uploading to server)
    //console.log("Selected file:", e.target.files[0]);
  };

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const updateProfile = async () => {
    try {
      const response = await api.put(`/user/${userId}`, {
        username: formData.userName,
        email: formData.email,
      });

      //console.log("Update Response:", response.data); // Debugging

      if (response.data.success) {
        //console.log("Profile updated successfully!");
        getUserProfile(userId); // Fetch the latest data immediately after update
      } else {
        alert("Failed to update profile: " + response.data.message);
      }
    } catch (error) {
      //console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleSave = () => {
    // Logic for saving form data (e.g., API call)
    updateProfile();
    //console.log("Saving form data:", formData);
  };

  return (
    <>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="bg-[#fffbfe] min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-medium text-[#262626] mb-8 sm:mb-12">
          My Informations
        </h1>

        {/* Main Content */}
        <div className="bg-white w-full max-w-4xl p-6 sm:p-8 rounded-lg shadow-xl flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* User Picture Section */}
          <div className="flex justify-center sm:justify-start">
            <UserPicture handleFileChange={handleFileChange} />
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
              {/* Change Password Button */}
              <button className="bg-[#2E75AD] text-white text-sm sm:text-base font-medium rounded py-2 px-4 w-full sm:w-auto">
                Change Password
              </button>

              {/* Save & Go Back Button */}
              <Link href="/profile/myquestions">
                <button
                  onClick={handleSave}
                  className="bg-[#FF902E] text-white text-sm sm:text-base font-medium rounded py-2 px-4 w-full sm:w-auto"
                >
                  Save & Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
