import React from "react";

const WarningModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 bg-base-100 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-xl font-semibold mb-4 text-center">Discard post?</p>
        <p className="text-gray-600 mb-6 text-center">
          If you leave, your edits won&apos;t be saved.
        </p>
        <div className="flex justify-center gap-3">
          <button className="btn btn-sm btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-sm btn-primary" onClick={onConfirm}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
