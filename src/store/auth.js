// src/store/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // Initial state for the user (null before login)
  accessToken: null, // JWT access token
  refreshToken: null, // JWT refresh token
  loading: false, // Loading state for authentication
  error: null, // Error state
  clearUser: () => set({ user: null, accessToken: null, refreshToken: null }),
  // Action to set user and tokens after login
  setUser: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken });
  },

  // Action to clear user data on logout
  logout: () => {
    set({ user: null, accessToken: null, refreshToken: null });
  },

  setLoading: (loading) => {
    set({ loading });
  },

  setError: (error) => {
    set({ error });
  },
}));
