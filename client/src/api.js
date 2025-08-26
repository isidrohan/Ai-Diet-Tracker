import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-diet-backend-2ls2.onrender.com/api",
});

export default API;
