import axios from "axios";
import { refreshAccessToken } from "./refreshToken";
import { getAccessToken } from "../services/tokenService";

const api = axios.create({
  baseURL: "https://frirsta-blog-53010ec1265c.herokuapp.com/",
});

api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        console.error("Token refresh failed", error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const getCurrentUser = async () => {
  try {
    const response = await api.get("current-user/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};

export default api;
