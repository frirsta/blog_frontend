"use client";
import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { FaMoon, FaSun, FaUser, FaLock } from "react-icons/fa";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaUserXmark } from "react-icons/fa6";
import { themeChange } from "theme-change";
import { useAuth } from "@/context/AuthContext";
import ChangePassword from "@/app/change-password/page";
import PasswordReset from "@/app/password-reset/page";
import ProfileDetailsForm from "./form/ProfileDetailsForm";
import DeleteAccount from "./profile/DeleteAccount";

export default function Sidebar() {
  const { currentUser } = useAuth();
  const [currentTheme, setCurrentTheme] = useState("valentine");
  const [selectedItem, setSelectedItem] = useState("edit-profile");
  const [profileData, setProfileData] = useState({
    profile_picture: currentUser?.profile_picture,
    cover_picture: currentUser?.cover_picture,
    bio: currentUser?.bio || "",
    location: currentUser?.location || "",
    website: currentUser?.website || "",
    username: currentUser?.username || "",
  });

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

  const renderContent = () => {
    switch (selectedItem) {
      case "change-password":
        return <ChangePassword />;
      case "reset-password":
        return <PasswordReset />;
      case "delete-account":
        return <DeleteAccount />;
      case "edit-profile":
      default:
        return (
          <div className="py-20">
            <ProfileDetailsForm
              profileData={profileData}
              setProfileData={setProfileData}
            />
          </div>
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
        <ul className="menu bg-base-200 min-h-full w-80 p-4 flex flex-col items-baseline">
          <h2 className="text-center text-2xl font-bold pt-2 w-full">
            Settings
          </h2>

          <div className="divider"></div>
          <li className="w-full">
            <a
              className="py-3 px-4 w-full"
              onClick={() => handleMenuClick("edit-profile")}
            >
              <FaUser className="w-6 h-6" /> Edit Profile
            </a>
          </li>
          <li className="w-full">
            <a
              className="py-3 px-4 w-full"
              onClick={() => handleMenuClick("change-password")}
            >
              <FaLock className="w-6 h-6" /> Change Password
            </a>
          </li>
          <li className="w-full">
            <a
              className="py-3 px-4 w-full"
              onClick={() => handleMenuClick("reset-password")}
            >
              <BsShieldFillCheck className="w-6 h-6" /> Reset Password
            </a>
          </li>
          <li className="w-full">
            <a
              className="py-3 px-4 w-full"
              onClick={() => handleMenuClick("delete-account")}
            >
              <FaUserXmark className="w-6 h-6" /> Account Settings
            </a>
          </li>
          <li className="w-full">
            <button
              aria-label="Toggle night/valentine theme"
              onClick={handleThemeToggle}
              className="py-3 px-4 w-full"
            >
              {currentTheme === "valentine" ? (
                <FaMoon className="w-6 h-6" />
              ) : (
                <FaSun className="w-6 h-6" />
              )}
              Theme
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
