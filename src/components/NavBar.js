"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  console.log("Is logged in:", isLoggedIn);
  return (
    <div>
      {isLoggedIn && (
        <>
          Navbar <button onClick={handleLogout}>logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
