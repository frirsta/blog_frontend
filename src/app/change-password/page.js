"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormHandler from "@/components/form/FormHandler";
import PrivateRoute from "@/components/routes/PrivateRoute";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <PrivateRoute>
      <FormHandler
        endpoint="profiles/change-password/"
        data={{ old_password: oldPassword, new_password: newPassword }}
        successMessage="Password has been updated successfully."
      >
        {({ handleSubmit }) => (
          <div className="py-20 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card w-full max-w-md bg-base-100 sm:shadow-2xl sm:drop-shadow-2xl z-10"
            >
              <div className="card-body p-8">
                <div className="mt-6 mb-3">
                  <h2 className="card-title text-3xl font-extrabold text-base-content pb-3 justify-center">
                    Change Password
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter old password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="input input-bordered w-full placeholder:text-base-content/50"
                      aria-label="Old Password"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input input-bordered w-full placeholder:text-base-content/50"
                      aria-label="New Password"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn bg-base-content text-base-100 w-full"
                  >
                    Change Password
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </FormHandler>
    </PrivateRoute>
  );
}
