"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthGate = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router) return;

    const allowedPaths = ["/login", "/signup", "/password-reset"];

    if (
      router.asPath &&
      (router.asPath.startsWith("/password-reset-confirm/") ||
        allowedPaths.includes(router.asPath))
    ) {
      return;
    }
  }, [isLoggedIn, router]);

  return children;
};

export default AuthGate;
