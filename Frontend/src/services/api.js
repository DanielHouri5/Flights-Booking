// Frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance for API requests
const api = axios.create({
  // baseURL: 'http://localhost:8080', // Uncomment for local development
  baseURL: 'https://flights-backend-1085375047232.us-central1.run.app', // Production backend URL
});

// Add a request interceptor to include the Authorization header if a token exists
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Export the configured Axios instance for use in the app
export default api;
