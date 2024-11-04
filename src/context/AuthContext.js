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
import api, { getCurrentUser } from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post("api/token/", { username, password });
      saveTokens(response.data.access, response.data.refresh);
      await initializeAuth();
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

  const initializeAuth = useCallback(async () => {
    const token = getAccessToken();
    if (token) {
      try {
        const refreshedToken = await refreshAccessToken();
        if (refreshedToken) {
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        handleLogout();
      }
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  }, [handleLogout]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        handleLogin,
        loginError,
        currentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
