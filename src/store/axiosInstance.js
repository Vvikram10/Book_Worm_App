// src/store/axiosInstance.js
import axios from 'axios';
import { useAuthStore } from './auth'; // Import the auth store for getting the token

const API_URL = 'http://192.168.29.4:8000/api/v1/'; // Replace with your Django API URL

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add request interceptor to add Authorization header with the token
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState(); // Get access token from Zustand store
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
