import React from "react";

export default function Category({ categoryName, size }) {
  return (
    <div className={`badge badge-outline text-${size}`}>{categoryName}</div>
  );
}
