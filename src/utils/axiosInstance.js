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
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
