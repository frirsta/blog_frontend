"use client";

import React, { useState, useEffect } from "react";
import PostsPage from "./posts/page";
import LoginPage from "./login/LoginPage";
import Link from "next/link";

export default function ClientLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <h1>My Blog</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          {isLoggedIn && (
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>
      <main>{isLoggedIn ? <PostsPage /> : <LoginPage />}</main>
    </>
  );
}
