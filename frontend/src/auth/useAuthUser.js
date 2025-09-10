import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = authStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post(`/api/auth/refresh_token`);
        const newToken = refreshResponse.data.accessToken;
        authStore.getState().setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
      catch (refreshError) {
        authStore.getState().setToken(null);
        toast.error("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const useAuthUser = create((set, get) => ({
  token: null,
  loading: false,
  error: null,

  formData: {
    username: "",
    email: "",
    password: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({
    formData: {
      username: "",
      email: "",
      password: "",
    }
  }),

  setToken: (token) => set({ token }),

  signin: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { email, password } = get().formData;
      const response = await api.post(`/api/auth/signin`, {
        email, password
      });
      toast.success("Login successful!");
      get().resetForm();
      set({ token: response.data.accessToken, error: null });
    } catch (error) {
      set({ error: "Something went wrong"});
      toast.error("Login failed. Please check your credentials.");
    } finally {
      set({ loading: false });
    }
  },

  signup: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { username, email, password } = get().formData;
      const response = await api.post(`/api/auth/signup`, {
        username, email, password
      });
      toast.success("Signup successful!");
      get().resetForm();
      set({ token: response.data.token, error: null });
    } catch (error) {
      set({ error: "Something went wrong"});
      toast.error("Signup failed. Please try again.");
    } finally {
      set({ loading: false });
    }
  },
})
);