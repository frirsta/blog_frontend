import api from "../utils/axiosInstance";
import { clearTokens } from "../services/tokenService";

// Function to handle the logout API call
export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      await api.post("/logout/", { refresh: refreshToken });
    }
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    clearTokens();
  }
};
