/* eslint-disable @typescript-eslint/no-explicit-any */
import { login, logout, validate } from "@/services/authService";
import { User } from "@/types/userType";
import { create } from "zustand";

const TOKEN_KEY = "token";

interface UserState {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  role?: string;
  error?: string;
  clear: () => void;
  resetError: () => void;
  validate: () => Promise<boolean>;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
  user: undefined,
  isAuthenticated: false,
  isLoading: false,
  error: undefined,
  role: undefined,

  clear: () =>
    set({ user: undefined, isAuthenticated: false, role: undefined }),
  resetError: () => set({ error: undefined }),

  login: async (phone: string, password: string) => {
    get().clear();
    set({ isLoading: true, error: undefined });

    try {
      const response = await login(phone, password);
      if (response?.data) {
        const { token, user } = response.data;
        localStorage.setItem(TOKEN_KEY, token);
        set({ user, isAuthenticated: true, isLoading: false });
        return true;
      } else {
        throw new Error("Invalid response from login");
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      set({
        isLoading: false,
        error: error?.message || "Login failed",
      });
      return false;
    }
  },

  validate: async () => {
    set({ isLoading: true, error: undefined });

    try {
      const response = await validate();
      set({ user: response, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error: any) {
      console.error("Error validating user:", error);
      set({
        isLoading: false,
        error: error?.message || "Validation failed",
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: undefined });

    try {
      const response = await logout();
      if (response) {
        localStorage.removeItem(TOKEN_KEY);
        get().clear();
      }
    } catch (error: any) {
      console.error("Error logging out:", error);
      set({
        error: error?.message || "Logout failed",
      });
    } finally { 
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
