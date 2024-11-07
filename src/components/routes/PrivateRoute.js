"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/password-reset",
  "/password-reset-confirm/[uid]/[token]",
];

function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*?\]/g, ".*")}$`);
    return regex.test(pathname);
  });
}

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (!isPublicRoute(pathname) && !currentUser) {
      router.push("/login");
    }
  }, [pathname, currentUser]);

  return isPublicRoute(pathname) || currentUser ? children : null;
}
