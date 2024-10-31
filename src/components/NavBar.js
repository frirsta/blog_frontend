"use client";
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { themeChange } from "theme-change";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import CreatePost from "./post/CreatePost";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("valentine");

  const { handleLogout, currentUser } = useAuth();

  const pathname = usePathname();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  return (
    <div>
      <div className="navbar bg-base-100 text-base-content">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            The Blog
          </Link>
        </div>
        <div className="flex-none gap-2">
          <button onClick={openModal} className="btn btn-primary">
            Create Post
          </button>
          <button
            aria-label="Toggle night/valentine theme"
            className="btn btn-sm"
            onClick={handleThemeToggle}
          >
            {currentTheme === "valentine" ? <FaMoon /> : <FaSun />}
          </button>

          {currentUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    width={40}
                    height={40}
                    src={currentUser.profile_picture || "/profile_default.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href={"/profile"}>Profile</Link>
                </li>
                <li>
                  <Link href={"/settings"}>Settings</Link>
                </li>
                <li>
                  <button className="text-left" onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : pathname === "/login" ? (
            <Link href="/signup" role="button" className="btn">
              Sign Up
            </Link>
          ) : (
            <Link href="/login" role="button" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CreatePost isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default NavBar;
