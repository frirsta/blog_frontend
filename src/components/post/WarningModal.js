import React from "react";

const WarningModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-4 bg-base-100 rounded-lg shadow-2xl drop-shadow-2xl max-w-sm w-full">
        <p className="text-xl font-semibold text-center">Discard post?</p>
        <p className="text-base-content/70 mb-4 text-center">
          If you leave, your edits won&apos;t be saved.
        </p>
        <div className="flex justify-center items-center space-x-2">
          <button
            className="btn transition-all duration-500 btn-sm btn-outline text-sm font-bold border-base-content text-center rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn transition-all duration-500 btn-sm btn-error text-error-content text-sm font-bold text-center bg-error rounded-lg"
            onClick={onConfirm}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
