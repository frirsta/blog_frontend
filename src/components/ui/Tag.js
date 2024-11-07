import React from "react";

export default function Tag({ tagName }) {
  return (
    <div className="text-base font-semibold text-accent block antialiased tracking-normal leading-relaxed">
      #{tagName}
    </div>
  );
}
