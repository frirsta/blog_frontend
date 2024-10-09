"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { themeChange } from "theme-change";
import { FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [currentTheme, setCurrentTheme] = useState("valentine");
  const { isLoggedIn, handleLogout } = useAuth();
  const pathname = usePathname();

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
      <nav className="navbar bg-base-100 px-6 py-4 shadow-md">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MyBlog</a>
        </div>

        <div className="flex-none space-x-4">
          <button
            aria-label="Toggle night/valentine theme"
            className="btn btn-sm"
            onClick={handleThemeToggle}
          >
            {currentTheme === "valentine" ? <FaMoon /> : <FaSun />}
          </button>

          {isLoggedIn ? (
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="avatar" src="/profile_default.png" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={handleLogout}>logout</button>
                  </li>
                </ul>
              </div>
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
      </nav>
    </div>
  );
};

export default NavBar;
