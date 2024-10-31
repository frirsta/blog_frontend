"use client";
import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { FaMoon, FaSun, FaUser, FaLock } from "react-icons/fa";
import { BsShieldFillCheck } from "react-icons/bs";
import { themeChange } from "theme-change";
import { useAuth } from "@/context/AuthContext";
import { useMessage } from "@/context/MessageContext";
import ChangePassword from "@/app/change-password/page";
import PasswordReset from "@/app/password-reset/page";
import api from "@/utils/axiosInstance";
import ProfileDetailsForm from "./form/ProfileDetailsForm";

export default function Sidebar() {
  const { showMessage } = useMessage();
  const { currentUser } = useAuth();
  const [currentTheme, setCurrentTheme] = useState("valentine");
  const [selectedItem, setSelectedItem] = useState("edit-profile");
  const [profileData, setProfileData] = useState({
    bio: currentUser?.bio || "",
    location: currentUser?.location || "",
    website: currentUser?.website || "",
  });

  const handleProfileDetailsChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    themeChange(false);
    const savedTheme = localStorage.getItem("theme") || "valentine";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "valentine" ? "night" : "valentine";
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", profileData.bio);
    formData.append("location", profileData.location);
    formData.append("website", profileData.website);

    try {
      const response = await api.patch("profiles/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "Profile updated successfully");
      setProfileData((prevData) => ({ ...prevData, ...response.data }));
      setSelectedItem(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.website?.[0] ||
        error.response?.data?.location?.[0] ||
        error.response?.data?.bio?.[0] ||
        "An error occurred. Please try again.";
      showMessage("error", errorMessage);
    }
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "change-password":
        return <ChangePassword />;
      case "reset-password":
        return <PasswordReset />;
      case "edit-profile":
      default:
        return (
          <ProfileDetailsForm
            profileData={profileData}
            handleProfileDetailsChange={handleProfileDetailsChange}
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  const handleMenuClick = (item) => {
    setSelectedItem(item);
    document.getElementById("drawer").checked = false;
  };

  return (
    <div className="drawer md:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-fit fixed z-10">
          <label
            htmlFor="drawer"
            aria-label="open sidebar"
            className="md:hidden drawer-button"
          >
            <Hamburger size={24} />
          </label>
        </div>
        <div className="z-0">
          <h2 className="card-title text-3xl font-extrabold justify-center top-20 relative">
            {selectedItem === "edit-profile"
              ? "Edit Profile"
              : selectedItem === "change-password"
              ? "Change Password"
              : "Reset Password"}
          </h2>
          <div className="p-3 m-auto">{renderContent()}</div>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <h2 className="text-center text-2xl font-bold py-2">Settings</h2>

          <div className="divider"></div>
          <li>
            <a onClick={() => handleMenuClick("edit-profile")}>
              <FaUser /> Edit Profile
            </a>
          </li>
          <li>
            <a onClick={() => handleMenuClick("change-password")}>
              <FaLock /> Change Password
            </a>
          </li>
          <li>
            <a onClick={() => handleMenuClick("reset-password")}>
              <BsShieldFillCheck /> Reset Password
            </a>
          </li>
          <li>
            <button
              aria-label="Toggle night/valentine theme"
              onClick={handleThemeToggle}
            >
              {currentTheme === "valentine" ? <FaMoon /> : <FaSun />}
              Theme
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
