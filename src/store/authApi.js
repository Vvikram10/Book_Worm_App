// // src/api/authApi.js
// import axios from 'axios';
// import { useAuthStore } from './auth'; // Import Zustand store

// const API_URL = 'http://192.168.29.4:8000/api/v1/'; // Change this to your backend URL

// // Register function
// export const register = async (username, email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}register/`, {
//       username,
//       email,
//       password,
//     });

//     if (response.status === 201) {
//       // If registration is successful, automatically login the user
//       await login(username, password); // Automatically login after registration
//     }
//     return { data: response.data, error: null };
//   } catch (error) {
//     return {
//       data: null,
//       error: error.response?.data?.detail || 'Registration failed',
//     };
//   }
// };

// // Login function
// export const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}token/`, {
//       username,
//       password,
//     });

//     if (response.status === 200) {
//       const { access, refresh } = response.data;

//       // Assuming the API provides a "user" object or you have a way to fetch it
//       const user = { username }; // Or fetch user info if your API provides it

//       // Save to Zustand store without needing to decode JWT token
//       useAuthStore.getState().setUser(user, access, refresh);
//     }

//     return { data: response.data, error: null };
//   } catch (error) {
//     return {
//       data: null,
//       error: error.response?.data?.detail || 'Login failed',
//     };
//   }
// };

// // Logout function
// export const logout = () => {
//   useAuthStore.getState().clearUser(); // Clear user data from store
// };

// src/api/authApi.js
import axiosInstance from './axiosInstance';  // Import the centralized axios instance
import { useAuthStore } from './auth'; // Import Zustand store

const API_URL = 'http://192.168.29.4:8000/api/v1/'; // Change this to your backend URL

// Register function
export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post(`${API_URL}register/`, {
      username,
      email,
      password,
    });

    if (response.status === 201) {
      // If registration is successful, automatically login the user
      await login(username, password); // Automatically login after registration
    }
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.detail || 'Registration failed',
    };
  }
};

// Login function
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('token/', { username, password });
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response?.data?.detail || 'Login failed' };
  }
};

// Logout function
export const logout = () => {
  useAuthStore.getState().clearUser(); // Clear user data from store
};

