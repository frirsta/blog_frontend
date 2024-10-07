"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken, clearTokens } from "../services/tokenService";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push("/login");
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    router.push("/login");
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
