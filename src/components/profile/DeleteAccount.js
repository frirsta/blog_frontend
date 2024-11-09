import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMessage } from "@/context/MessageContext";
import { useAuth } from "@/context/AuthContext";
import { deleteAccount } from "@/utils/accountService";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleLogout, currentUser } = useAuth();
  const { showMessage } = useMessage();

  const openDeleteModal = () => setIsModalOpen(true);

  const handleDeleteAccount = () => {
    deleteAccount(
      currentUser?.id,
      () => {
        showMessage("success", "Account deleted successfully.");
        handleLogout();
      },
      (error) => {
        // console.error("Failed to delete account:", error);
        showMessage("error", "Failed to delete account. Please try again.");
      }
    );
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl drop-shadow-2xl z-10 m-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 shadow-xl z-10 p-3"
      >
        <div className="text-center">
          {isModalOpen && (
            <ConfirmationModal
              isOpen={isModalOpen}
              onConfirm={handleDeleteAccount}
              onCancel={() => setIsModalOpen(false)}
              message="Are you sure you want to delete your account?"
              message2="I understand that this action is irreversible and will permanently
                delete my account data"
            />
          )}
        </div>

        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-3xl font-bold">Delete Account Data</p>
            <p className="text-gray-500 dark:text-gray-400">
              Please note that deleting your account is irreversible. All of
              your profile information, posts, and comments will be permanently
              removed. If you&apos;re sure, proceed with caution.
            </p>
          </div>

          <button className="btn btn-error w-full" onClick={openDeleteModal}>
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
