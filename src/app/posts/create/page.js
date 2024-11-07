import React from "react";
import PrivateRoute from "@/components/routes/PrivateRoute";
import CreatePost from "@/components/post/CreatePost";
import "@pqina/pintura/pintura.css";

const page = () => {
  return (
    <PrivateRoute>
      <div>
        <CreatePost />
      </div>
    </PrivateRoute>
  );
};

export default page;
