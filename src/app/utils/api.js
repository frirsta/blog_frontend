import axios from "axios";

const api = axios.create({
  baseURL: "https://frirsta-blog-53010ec1265c.herokuapp.com/",
});

export default api;
