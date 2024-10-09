"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthGate = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      if (!["/login", "/signup"].includes(router.asPath)) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, router]);

  return children;
};

export default AuthGate;
