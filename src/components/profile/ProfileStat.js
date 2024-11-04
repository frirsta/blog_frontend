import React from "react";

export default function ProfileStat({ label, value, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-sm text-base-content">{label}</p>
    </div>
  );
}
