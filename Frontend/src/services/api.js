// API service for making HTTP requests using Axios
// This file sets up a pre-configured Axios instance for the frontend

import axios from 'axios';

// Get the base URL from environment variable or use localhost as default
const BASE_URL = import.meta.env.VITE_SERVICE_URL || 'http://localhost:8080';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the Authorization header if a token exists
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

// Export the configured Axios instance for use in the app
export default api;
