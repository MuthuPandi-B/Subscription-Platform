import axios from "axios";

const API = axios.create({
  baseURL: "https://learning-platform-txgv.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
