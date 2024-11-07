"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");
  const { handleLogin } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setErrors("Passwords do not match.");
      return;
    }

    try {
      await api.post("/profiles/register/", {
        username,
        email,
        password,
      });

      handleLogin(username, password);
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 sm:shadow-2xl sm:drop-shadow-2xl z-10"
      >
        <div className="card-body p-8">
          <div className="mt-6 mb-6">
            <h2 className="card-title text-4xl font-extrabold pb-3 justify-center">
              Sign Up
            </h2>
            <p className="text-base-content/70 font-bold">
              Enter your details below to create an account and get started.
            </p>
          </div>
          <form
            onSubmit={handleSignup}
            className="space-y-4"
            autoComplete="off"
          >
            <div className="form-control">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="new-username"
                className="input input-bordered w-full placeholder:text-base-content/50"
              />
              {errors.username && (
                <div className="text-error text-sm mt-1 ml-1">
                  {errors.username}
                </div>
              )}
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full placeholder:text-base-content/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="new-email"
              />
              {errors.email && (
                <div className="text-error text-sm mt-1 ml-1">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Choose a Password"
                className="input input-bordered w-full placeholder:text-base-content/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              {errors.password && (
                <div className="text-error text-sm mt-1">{errors.password}</div>
              )}
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="input input-bordered w-full placeholder:text-base-content/50"
                required
                autoComplete="new-password"
              />
              {errors.password2 && (
                <div className="text-error text-sm mt-1">
                  {errors.password2}
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn bg-base-content text-base-100 w-full"
            >
              Sign Up
            </motion.button>
          </form>
          <div className="divider text-base-content/70 font-bold">
            Already have an account?
          </div>

          <Link
            href="/login"
            className="w-fit m-auto text-base-content font-bold"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
