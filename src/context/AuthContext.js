"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAccessToken,
  clearTokens,
  saveTokens,
} from "../services/tokenService";
import { refreshAccessToken } from "../utils/refreshToken";
import api from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = getAccessToken();
      if (token) {
        setIsLoggedIn(true);
        await refreshAccessToken();
        await fetchCurrentUser();
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("/api/token/", { username, password });
      saveTokens(response.data.access, response.data.refresh);
      setIsLoggedIn(true);
      await fetchCurrentUser();
      router.push("/posts");
    } catch (err) {
      setLoginError(err?.response?.data?.detail);
      console.error(err);
    }
  };

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    setCurrentUser(null);
    router.push("/login");
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/profiles/");
      setCurrentUser(response.data);
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      handleLogout();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLogout, handleLogin, loginError, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
