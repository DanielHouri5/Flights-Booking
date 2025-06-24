// Frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  //baseURL: 'http://localhost:8080',
  baseURL: 'https://flights-backend-1085375047232.us-central1.run.app',
=======
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://flights-backend-1085375047232.us-central1.run.app',
  // baseURL: 'http://backend:8080',
>>>>>>> aaa89e9ad565415dc988a666243ec929c86468ee
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
