"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken, clearTokens } from "../services/tokenService";
import { refreshAccessToken } from "../utils/refreshToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = getAccessToken();
      if (token) {
        setIsLoggedIn(true);
        await refreshAccessToken();
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
