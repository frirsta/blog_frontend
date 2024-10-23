"use client";

import { useMessage } from "@/context/MessageContext";

export default function Notification() {
  const { message } = useMessage();

  console.log("Notification Component - Current Message:", message);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
        message.type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {message.content}
    </div>
  );
}
