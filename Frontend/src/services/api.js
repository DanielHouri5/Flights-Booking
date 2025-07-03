// Frontend/src/services/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVICE_URL || 'http://localhost:8080';
// const BASE_URL = 'https://flights-backend-1085375047232.us-central1.run.app';
const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8080',
  // baseURL: 'https://flights-backend-1085375047232.us-central1.run.app',
=======
  baseURL: BASE_URL,
>>>>>>> 4cdcdbee561da45cfc6b9feec74ca0b0bff160f4
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
