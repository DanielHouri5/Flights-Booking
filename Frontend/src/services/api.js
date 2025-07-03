// Frontend/src/services/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVICE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;