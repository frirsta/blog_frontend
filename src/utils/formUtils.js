import api from "./axiosInstance";

export const handleFormSubmission = async ({
  endpoint,
  data,
  setSuccess,
  successMessage,
  setError,
  onSuccess,
}) => {
  try {
    const response = await api.post(endpoint, data);
    if (response.status === 200) {
      setError("");
      setSuccess(successMessage);
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Something went wrong. Please try again.";
    setSuccess("");
    setError(errorMessage);
    console.error("Error during form submission:", error);
  }
};
