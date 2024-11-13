"use client";

import { useMessage } from "@/context/MessageContext";
import api from "@/utils/axiosInstance";

const FormHandler = ({
  children,
  onSuccess,
  endpoint,
  data,
  successMessage,
}) => {
  const { showMessage } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(endpoint, data);
      if (response.status === 200) {
        if (successMessage) {
          localStorage.setItem(
            "persistentMessage",
            JSON.stringify({ type: "success", content: successMessage })
          );
          // console.log(
          //   "Success message stored in localStorage:",
          //   successMessage
          // );
          showMessage("success", successMessage);
        }
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "Something went wrong. Please try again.";
      showMessage("error", errorMessage);
      // console.error("Error during form submission:", error);
    }
  };

  return children({ handleSubmit });
};

export default FormHandler;
