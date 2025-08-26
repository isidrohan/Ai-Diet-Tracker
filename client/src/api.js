import axios from "axios";

const API = axios.create({
  // baseURL: "https://ai-diet-backend-2ls2.onrender.com/api",
  baseURL:  `${import.meta.env.VITE_BASE_URL}/api`,
  // baseURL:  "http://localhost:5000/api",
});

export default API;
