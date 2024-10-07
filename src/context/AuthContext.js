"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken,
  clearTokens,
  saveTokens,
} from "../services/tokenService";
import { refreshAccessToken } from "../utils/refreshToken";
import { useRouter } from "next/navigation";
import api from "../utils/axiosInstance";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const router = useRouter();
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

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("/api/token/", { username, password });
      saveTokens(response.data.access, response.data.refresh);
      setIsLoggedIn(true);
      router.push("/posts");
    } catch (err) {
      setLoginError(err?.response?.data?.detail);
      console.error(err);
    }
  };
  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLogout, handleLogin, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
