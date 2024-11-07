"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

function LoginPage() {
  const { handleLogin, loginError } = useAuth() || {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 sm:shadow-2xl sm:drop-shadow-2xl z-10"
      >
        <div className="card-body p-8">
          {loginError && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{loginError}</span>
            </div>
          )}
          <div className="mt-6 mb-6">
            <h2 className="card-title text-4xl font-extrabold pb-3 justify-center">
              Sign In
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="input input-bordered w-full placeholder:text-base-content/50"
                aria-label="Username"
              />
            </div>
            <div className="w-full text-right">
              <div className="form-control">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="input input-bordered w-full placeholder:text-base-content/50"
                  aria-label="Password"
                />
              </div>
              <div className="p-4">
                <Link
                  href="/password-reset"
                  className="m-auto text-base-content/70 font-bold"
                >
                  Forgotten your password?
                </Link>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn bg-base-content text-base-100 w-full"
            >
              Login
            </motion.button>
          </form>

          <div className="divider text-base-content/70">OR</div>

          <div className="text-base-content/70 text-center font-bold">
            Don&apos;t have an account?&nbsp;
          </div>
          <Link
            href="/signup"
            className="w-fit m-auto text-base-content font-bold"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
