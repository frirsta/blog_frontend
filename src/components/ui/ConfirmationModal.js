import React from "react";

export default function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
  message2,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box text-center p-4 w-full max-w-md max-h-full rounded-lg shadow-lg">
        <h3 className="font-bold text-2xl text-base-content p-1">{message}</h3>
        <p className="text-sm text-gray-500">{message2}</p>
        <div className="mt-5">
          <button
            onClick={onCancel}
            className="btn btn-sm btn-secondary text-secondary-content mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm btn-error text-error-content"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
