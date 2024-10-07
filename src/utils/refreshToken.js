import axios from "axios";
import {
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../services/tokenService";

const API_URL =
  "https://frirsta-blog-53010ec1265c.herokuapp.com/api/token/refresh/";

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error("No refresh token available");
    clearTokens();
    return null;
  }

  try {
    const response = await axios.post(API_URL, { refresh: refreshToken });
    const { access, refresh } = response.data;

    console.log("Tokens received:", { access, refresh });

    saveTokens(access, refresh);
    return access;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error
    );

    if (error.response && error.response.status === 401) {
      clearTokens();
      window.location.href = "/login";
    }

    throw new Error("Token refresh failed");
  }
};
