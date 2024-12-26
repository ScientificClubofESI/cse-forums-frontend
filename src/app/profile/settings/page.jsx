"use client";

import React, { useState } from "react";
import Image from "next/image";
import userpicture from "./userpicture.svg"; // Importing a user picture (SVG file)

// Subcomponent: User Picture Section
const UserPicture = ({ handleFileChange }) => (
  <div className="flex flex-col items-center sm:items-start sm:mr-10 sm:mb-10">
    <Image
      src={userpicture}
      alt="User Picture"
      className="h-[11rem] w-[11rem] rounded-full"
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
      className="text-[#2E75AD] cursor-pointer mt-4 sm:mt-[1rem] text-center sm:text-left sm:ml-[2.05rem] sm:mt-3 font-serif"
    >
      Change Picture
    </label>
    {/* Space under the button only in mobile version */}
    <div className="sm:hidden mt-4 w-[30rem] mb-[1rem]">
      <hr className="border-t border-gray-300" />
    </div>
  </div>
);


// Subcomponent: Form Input
const FormInput = ({ label, type, placeholder, value, onChange, name }) => (
  <div className="flex items-center gap-4 w-full">
    <label className="text-[#262626] w-[8rem] text-left font-serif">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name} // Pass name here
      className="opacity-100 placeholder-opacity-100 border border-gray-100 shadow-sm rounded px-4 py-2 text-sm placeholder:text-[#262626] placeholder:font-light flex-grow focus:ring-2 focus:ring-[#2E75AD]"
      style={{ backgroundColor: "#fffbfe" }}
    />
  </div>
);

export const Settings = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    // Logic for handling file upload (e.g., updating state or uploading to server)
    console.log("Selected file:", e.target.files[0]);
  };

  const handleSave = () => {
    // Logic for saving form data (e.g., API call)
    console.log("Saving form data:", formData);
  };



  return (
    <div className="bg-[#fffbfe] min-h-screen flex flex-col items-center justify-center">
      {/* Title */}
      <div className="text-5xl text-[#262626] mb-8 mr-[17.8rem] sm:w-full max-w-[51%] text-left sm:text-4xl">
        My Information
      </div>

      {/* Main Content */}
      <div className="bg-white sm:w-full max-w-[67.375rem] p-8 rounded-lg shadow-xl flex flex-col sm:flex-row items-center sm:items-start sm:p-10 sm:mx-4 sm:mx-[2rem]">
        {/* User Picture Section */}
        <UserPicture handleFileChange={handleFileChange} />
        
        {/* Vertical Line for Desktop */}
        <div className="hidden sm:block border-l border-gray-300 h-[16rem] mx-8"></div> {/* Vertical line for desktop */}

        {/* Form Section */}
        <div className="flex flex-col gap-6 flex-grow sm:w-[50%]">
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
          <div className="flex justify-between items-center gap-4 sm:gap-8 mt-6">
            {/* Change Password Button */}
            <button className="bg-[#2E75AD] rounded text-white w-[9rem] h-10 sm:w-[12rem] sm:h-12">
              Change Password
            </button>

            {/* Save & Go Back Button for Mobile */}
            <button
              onClick={handleSave}
              className="bg-[#FF902E] rounded text-white w-[12rem] h-10 sm:hidden"
            >
              Save & Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Save & Go Back Button for Desktop */}
      <div className="hidden sm:flex justify-center mt-10 sm:mt-14">
        <button
          onClick={handleSave}
          className="bg-[#FF902E] rounded text-white w-60 h-12 sm:w-72 sm:h-14 text-xl"
        >
          Save & Go Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
