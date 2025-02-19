"use client";

import React, { useState } from "react";
import Image from "next/image";
import userpicture from "./userpicture.svg"; // Importing a user picture (SVG file)

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
      className="text-[#2E75AD] font-medium md:text-xl text-sm	md:ml-[1.1rem] cursor-pointer mt-4 sm:mt-[1rem] text-center sm:text-left sm:ml-[2.05rem] sm:mt-3 font-serif md:font-bold"
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
    <label className="text-[#262626] md:w-[5.6rem] w-[5.5rem] text-left font-serif font-medium sm:font-bold		">{label}</label>
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
    <div className="bg-[#fffbfe] min-h-screen flex flex-col items-center px-[5%] justify-center gap-y-14 py-14">
      {/* Title */}
      <div className="font-sans sm:font-semiboldsm:font-sans text-3xl text-[#262626] sm:w-full sm:text-5xl font-medium">
      My Informations
      </div>

      {/* Main Content */}
      <div className="bg-white w-full p-8 rounded-lg shadow-xl flex flex-col sm:flex-row items-center sm:items-start sm:p-10 sm:mx-4">
        {/* User Picture Section */}
        <UserPicture handleFileChange={handleFileChange} />
        
        {/* Vertical Line for Desktop */}
        <div className="hidden sm:block border-l border-neutral-300 h-[16rem] p-[1.5rem] ml-[0.6rem]"></div> {/* Vertical line for desktop */}

        {/* Form Section */}
        <div className="flex flex-col gap-6 flex-grow w-[19.875rem]">
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
            <button className="font-sans sm:font-normal	text-sm md:text-xl bg-[#2E75AD] rounded text-white w-[9rem] h-10 md:w-[16.125rem] sm:h-12 font-medium	">
              Change Password
            </button>

            {/* Save & Go Back Button for Mobile */}
            <button
              onClick={handleSave}
              className="bg-[#FF902E] text-sm rounded text-white w-[12rem] h-10 sm:hidden font-medium	font-sans"
            >
              Save & Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Save & Go Back Button for Desktop */}
      <div className="hidden sm:flex justify-center">
        <button
          onClick={handleSave}
          className="bg-[#FF902E] font-normal	 rounded text-white w-60 h-[3rem] sm:w-[15.125rem] text-xl"
        >
          Save & Go Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
