"use client";

import { createContext, useState, useContext, useEffect } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const persistentMessage = localStorage.getItem("persistentMessage");
    if (persistentMessage) {
      const parsedMessage = JSON.parse(persistentMessage);
      console.log("Retrieved message from localStorage:", parsedMessage);
      setMessage(parsedMessage);
      localStorage.removeItem("persistentMessage");

      setTimeout(() => {
        setMessage(null);
        console.log("Message cleared after 5 seconds");
      }, 5000);
    }
  }, []);

  const showMessage = (type, content) => {
    setMessage({ type, content });
    console.log("Message set:", { type, content });

    localStorage.setItem(
      "persistentMessage",
      JSON.stringify({ type, content })
    );

    setTimeout(() => {
      setMessage(null);
      localStorage.removeItem("persistentMessage");
      console.log("Message cleared after 5 seconds");
    }, 5000);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
