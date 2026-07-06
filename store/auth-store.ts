import { api } from "@/service/api";
import { create } from "zustand";

export type Role = "SUPERADMIN" | "DIRECTOR" | "RECEPTION" | "TEACHER" | "STUDENT";

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  role: Role;
  updatedAt: string;
}

export interface LoginResponse {
  user: IUser;
  accessToken: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (data: LoginDto) => Promise<void>;
  logout: () => Promise<void>;

  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/login", data);
      set({
        user: res.data.user,
        accessToken: res.data.accessToken,
        isAuthenticated: true,
      });

      return res.data;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    }
  },

  setAccessToken: (accessToken) =>
    set((state) => ({
      accessToken,
      isAuthenticated: !!accessToken && !!state.user,
    })),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
