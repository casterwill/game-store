import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ganti sesuai backendmu
  withCredentials: true, // kalo pake cookie
});

export default api;
