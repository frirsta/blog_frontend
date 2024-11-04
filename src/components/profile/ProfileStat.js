import React from "react";

export default function ProfileStat({ label, value }) {
  return (
    <div>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-sm text-base-content">{label}</p>
    </div>
  );
}
