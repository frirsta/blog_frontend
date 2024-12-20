"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FormHandler from "@/components/form/FormHandler";

export default function PasswordResetConfirm({ params }) {
  const { uid, token } = React.use(params);
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  return (
    <FormHandler
      endpoint="profiles/password-reset-confirm/"
      data={{ uid, token, new_password: newPassword }}
      successMessage="Password reset successful!"
      onSuccess={() => {
        router.push("/login");
      }}
    >
      {({ handleSubmit }) => (
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card w-full max-w-md bg-base-100 shadow-xl z-10"
          >
            <div className="card-body p-8">
              <div className="mt-6 mb-3">
                <h2 className="card-title text-3xl font-extrabold justify-center pb-3">
                  Reset Your Password
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
                  if (newPassword !== confirmPassword) {
                    setErrors("Passwords do not match");
                    return;
                  }
                  handleSubmit(e);
                }}
                className="space-y-4"
              >
                <div className="form-control">
                  <label className="label">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input input-bordered w-full placeholder:text-base-100/50"
                    aria-label="New Password"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full placeholder:text-base-100/50"
                    aria-label="Confirm Password"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Reset Password
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </FormHandler>
  );
}
