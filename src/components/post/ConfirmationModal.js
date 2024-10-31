"use client";

import React from "react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
        <p>
          Do you really want to delete this post? This action cannot be undone.
        </p>
        <div className="flex justify-end mt-6 space-x-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
