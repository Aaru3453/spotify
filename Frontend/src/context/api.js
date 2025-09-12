import axios from "axios";
import { API_BASE } from "./config";

const api = axios.create({
  baseURL: API_BASE + "/api",
  withCredentials: true   // ✅ har request ke sath cookies bhejega
});

// Agar kabhi token manually localStorage me ho to bhi header me daal do
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

