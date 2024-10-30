"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormHandler from "@/components/form/FormHandler";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  return (
    <FormHandler
      endpoint="profiles/password-reset/"
      data={{ email }}
      successMessage="If an account with that email exists, you will receive a password reset email shortly."
    >
      {({ handleSubmit }) => (
        <div className="min-h-screen flex items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card w-full max-w-md bg-base-100 shadow-xl z-10"
          >
            <div className="card-body p-8">
              <div className="mt-6 mb-3">
                <h2 className="card-title text-3xl font-extrabold">
                  Reset Password
                </h2>
              </div>

              {errors && (
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
                  <span>{errors}</span>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  aria-label="Email"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Send Reset Link
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </FormHandler>
  );
}
