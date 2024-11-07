import PrivateRoute from "@/components/routes/PrivateRoute";
import UserSearch from "@/components/UserSearch";
import React from "react";

const page = () => {
  return (
    <PrivateRoute>
      <div>
        <UserSearch />
      </div>
    </PrivateRoute>
  );
};

export default page;
