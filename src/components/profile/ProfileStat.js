import React from "react";

export default function ProfileStat({ label, value }) {
  return (
    <div>
      <div className="bg-base-200 rounded-box p-3">
        <span className="text-2xl font-bold text-primary">{value}</span>
        <p className="text-xs font-medium text-base-content/70">{label}</p>
      </div>
    </div>
  );
}
