import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.VITE_BASE_URL}/api`,
});

export default API;
