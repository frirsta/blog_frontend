"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSun, FaMoon } from "react-icons/fa";
import { themeChange } from "theme-change";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [currentTheme, setCurrentTheme] = useState("valentine");

  const { currentUser } = useAuth();

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
    !currentUser && (
      <div className="w-full fixed">
        <div className="w-full navbar text-base-content navbar-end">
          <div className="flex-none gap-2 navbar-end">
            <button
              aria-label="Toggle night/valentine theme"
              className="btn btn-sm"
              onClick={handleThemeToggle}
            >
              {currentTheme === "valentine" ? <FaMoon /> : <FaSun />}
            </button>
            {pathname === "/login" ? (
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
    )
  );
};

export default NavBar;
