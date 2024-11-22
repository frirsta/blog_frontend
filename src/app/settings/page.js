import React from "react";
import PrivateRoute from "@/components/routes/PrivateRoute";
import Sidebar from "@/components/navigation/Sidebar";

export default function page() {
  return (
    <PrivateRoute>
      <div>
        <Sidebar />
      </div>
    </PrivateRoute>
  );
}
