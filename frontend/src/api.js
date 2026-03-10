import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//  Request Interceptor (attach token)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

//  Response Interceptor (auto logout on 401)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(err);
  },
);

export default API;
