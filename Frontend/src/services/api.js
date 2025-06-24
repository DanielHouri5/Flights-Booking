// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://localhost:8080',
  baseURL: 'https://flights-backend-1085375047232.us-central1.run.app',
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
