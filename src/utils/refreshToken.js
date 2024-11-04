import { jwtDecode } from "jwt-decode";
import {
  getRefreshToken,
  saveTokens,
  clearTokens,
  getAccessToken,
} from "../services/tokenService";
import api from "./axiosInstance";

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error("No refresh token available");
    clearTokens();
    return null;
  }

  try {
    const decodedToken = jwtDecode(refreshToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp - currentTime < 60) {
      const response = await api.post("api/token/refresh/", {
        refresh: refreshToken,
      });
      const { access, refresh } = response.data;

      console.log("Tokens received:", { access, refresh });

      saveTokens(access, refresh);
      return access;
    }
    return getAccessToken();
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error
    );

    if (error.response && error.response.status === 401) {
      clearTokens();
    }

    return null;
  }
};
