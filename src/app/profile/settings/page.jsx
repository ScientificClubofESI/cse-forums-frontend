"use client";

import React, { useState } from "react";
import Image from "next/image";
import userpicture from "../../../../public/images/avatars/userpicture.svg"; // Importing a user picture (SVG file)
import { useEffect } from "react";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import Navbar from "@/components/navbar/navbar";

// Import the hooks
import useAuth, { useUserProfile, useChangePassword } from "@/hooks/Auth";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export const Settings = () => {

  // the profile picture hook and state
  const [profilePicture, setProfilePicture] = useState("");
  const { uploadImage, loading: uploadLoading, error: uploadError } = useCloudinaryUpload();
  // Authentication and profile hooks
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    updateProfile,
  } = useUserProfile(userId);
  const {
    changePassword,
    loading: passwordLoading,
    error: passwordError,
    clearError,
  } = useChangePassword();

  const [isPasswordMode, setIsPasswordMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setProfilePicture(profile.profile_picture || null);
      isInitialized.current = true; // Mark as initialized
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isPasswordMode) {
      setPasswordData((prevData) => ({ ...prevData, [name]: value }));
      // Clear errors when user starts typing
      if (validationError) setValidationError("");
      if (passwordError) clearError();
      if (successMessage) setSuccessMessage("");
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      if (successMessage) setSuccessMessage("");
    }
  };

  const handleImageUpload = async (file) => {
    // console.log('Starting image upload...', file);
    clearError();
    const imageUrl = await uploadImage(file, 'profile');
    // console.log('Upload result:', imageUrl);
    if (imageUrl) {
      setProfilePicture(imageUrl);
      // console.log('Profile picture URL set:', imageUrl);
    } else {
      // console.log('Upload failed - no URL returned');
    }
  };


  const handleSave = async () => {
    if (isPasswordMode) {
      // Prevent password changes for Google auth users
      if (profile?.auth_provider === "GOOGLE") {
        setValidationError(
          "Password changes are not available for Google authenticated users"
        );
        return;
      }

      // Handle password change

      // Basic validation
      if (!passwordData.currentPassword) {
        setValidationError("Current password is required");
        return;
      }

      if (!passwordData.newPassword) {
        setValidationError("New password is required");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        setValidationError("New password must be at least 6 characters long");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setValidationError("New passwords do not match");
        return;
      }

      if (passwordData.currentPassword === passwordData.newPassword) {
        setValidationError(
          "New password must be different from current password"
        );
        return;
      }

      const result = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (result.success) {
        console.log("Password changed successfully!");
        // Reset password form and switch back to profile mode
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setValidationError("");
        setSuccessMessage("Password changed successfully!");
        setIsPasswordMode(false);
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } else {
      // Handle profile update
      const updateData = {
        username: formData.userName,
        fullname: formData.fullName,
        profile_picture: profilePicture,
      };

      // Only include email in update if user is not using Google auth
      if (profile?.auth_provider !== "GOOGLE") {
        updateData.email = formData.email;
      }

      // console.log('Updating profile with data:', updateData);
      const result = await updateProfile(updateData);

      if (result.success) {
        // console.log('Profile updated successfully!', result);
        setSuccessMessage("Profile updated successfully!");
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        // console.log('Failed to update profile:', result.error);
      }
    }
  };

  const togglePasswordMode = () => {
    setIsPasswordMode(!isPasswordMode);
    setValidationError("");
    setSuccessMessage("");
    if (passwordError) clearError();

    // Reset password form when switching modes
    if (!isPasswordMode) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };



  // Subcomponent: User Picture Section
  const UserPicture = () => (
    <div className="flex flex-col items-center sm:items-start sm:mr-10 sm:ml-10 sm:mb-10">
      <div className="relative">
        <Image
          src={profilePicture || userpicture}
          alt="User Picture"
          width={180}
          height={180}
          className="md:h-[11rem] md:w-[11rem] w-[113px] h-[113px] rounded-full object-cover"
        />
        {uploadLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="text-white text-sm">Uploading...</div>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="upload-picture"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
        disabled={uploadLoading}
      />
      {/* Change Picture Button */}
      <label
        htmlFor="upload-picture"
        className={`text-[#2E75AD] font-medium md:text-xl text-sm md:ml-[1.1rem] mt-4 text-center sm:text-left sm:ml-[2.05rem] sm:mt-3 font-serif md:font-bold ${uploadLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:underline'
          }`}
      >
        {uploadLoading ? 'Uploading...' : 'Change Picture'}
      </label>
      {/* Space under the button only in mobile version */}
      <div className="sm:hidden mt-4 w-[20.2rem] mb-[1rem]">
        <hr className="border-t border-neutral-500" />
      </div>
    </div>
  );

  return (
    <>
      {isAuthenticated ? <Navbarsignedin /> : <Navbar />}
      <div className="bg-gray-100 h-screen flex flex-col items-center justify-start p-4 sm:p-8 sm:px-36">
        {/* Title */}
        <div className="w-full mt-6">
          <h1 className="text-[20px] sm:text-5xl font-medium text-[#262626] mb-8 sm:mb-12 text-start">
            {isPasswordMode ? "Change Password" : "My Informations"}
          </h1>
        </div>
        {uploadError && (
          <div className="w-full mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {uploadError}
            </div>
          </div>
        )}

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
            {!isPasswordMode ? (
              // Profile Update Form
              <>
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
                  disabled={profile?.auth_provider === "GOOGLE"}
                />
              </>
            ) : (
              // Change Password Form
              <>
                <FormInput
                  label="Current Password :"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                />
                <FormInput
                  label="New Password :"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  name="newPassword"
                />
                <FormInput
                  label="Confirm Password :"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  name="confirmPassword"
                />
              </>
            )}

            {/* Success Message Display */}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {successMessage}
              </div>
            )}

            {/* Error Display */}
            {(validationError || passwordError || profileError) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {validationError || passwordError || profileError}
              </div>
            )}

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              {/* Only show Change Password button if user is not using Google auth */}
              {profile?.auth_provider !== "GOOGLE" && (
                <button
                  onClick={togglePasswordMode}
                  className="bg-[#2E75AD] text-white text-sm sm:text-base font-medium rounded py-3 px-16 w-full sm:w-auto hover:bg-[#245a8a] transition-colors"
                >
                  {isPasswordMode ? "Update Profile" : "Change Password"}
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={isPasswordMode ? passwordLoading : profileLoading}
                className="bg-[#FF902E] text-white text-sm sm:text-base font-medium rounded py-3 px-16 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(isPasswordMode ? passwordLoading : profileLoading)
                  ? "Saving..."
                  : "Save & Go Back"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// Subcomponent: Form Input
const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  disabled,
}) => (
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
      className={`placeholder-opacity-100 shadow-sm rounded-[4px] px-4 py-4 text-sm placeholder:text-[#262626] placeholder:font-light sm:placeholder:font-light placeholder:font-serif flex-grow ${disabled
        ? "bg-gray-200 cursor-not-allowed text-gray-600"
        : "bg-gray-100"
        }`}
      disabled={disabled}
    />
  </div>
);

export default Settings;
