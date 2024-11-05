"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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
  const [loginError, setLoginError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();
  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("api/token/", { username, password });
      saveTokens(response.data.access, response.data.refresh);
      await fetchCurrentUser();
      router.push("/");
    } catch (err) {
      setLoginError(err?.response?.data?.detail);
      console.error(err);
    }
  };

  const handleLogout = useCallback(() => {
    clearTokens();
    setCurrentUser(null);
    setLoginError(null);
    router.push("/login");
  }, [router]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("current-user/");
      setCurrentUser(response.data);
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    const checkToken = async () => {
      const token = getAccessToken();
      if (token) {
        await refreshAccessToken();
        await fetchCurrentUser();
      } else {
      }
    };

    checkToken();
  }, [fetchCurrentUser, router]);

  return (
    <AuthContext.Provider
      value={{ handleLogout, handleLogin, loginError, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
