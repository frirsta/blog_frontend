import React from "react";

const WarningModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 bg-base-100 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg font-semibold mb-4">Discard post?</p>
        <p className="text-gray-600 mb-6">
          If you leave, your edits won't be saved.
        </p>
        <div className="flex justify-end gap-4">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
