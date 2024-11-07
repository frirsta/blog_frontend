import React from "react";

export default function Loading({ message }) {
  return (
    <div className="flex flex-col items-center">
      <span className="loading loading-spinner loading-lg"></span>
      <span className="text-lg mt-3 font-bold">{message}</span>
    </div>
  );
}
