"use client";
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { themeChange } from "theme-change";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [currentTheme, setCurrentTheme] = useState("valentine");
  const { isLoggedIn, handleLogout, currentUser } = useAuth();
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
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="flex-none gap-2">
            <button
              aria-label="Toggle night/valentine theme"
              className="btn btn-sm"
              onClick={handleThemeToggle}
            >
              {currentTheme === "valentine" ? <FaMoon /> : <FaSun />}
            </button>
            {isLoggedIn ? (
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
                      src={
                        currentUser.profile_picture || "/profile_default.png"
                      }
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
                    <Link href={"/profile"}>Settings</Link>
                  </li>
                  <li>
                    <button className="text-left" onClick={handleLogout}>
                      logout
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
      </div>
    </div>
  );
};

export default NavBar;
