import axios from "axios";

//  baseURL for backend
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//  Add token automatically (Interceptor)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or "accessToken"
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
