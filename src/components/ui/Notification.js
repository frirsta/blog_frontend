"use client";

import { useMessage } from "@/context/MessageContext";

export default function Notification() {
  const { message } = useMessage();

  console.log("Notification Component - Current Message:", message);

  if (!message) return null;

  return (
    <div
      className={`w-[95%] sm:w-fit sm:max-w-[90%] right-[2.5%] fixed top-4 sm:top-8 sm:right-4 p-4 rounded-md shadow-md z-50 ${
        message.type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {message.content}
    </div>
  );
}
