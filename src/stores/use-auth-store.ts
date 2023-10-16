import { LOGIN_PATH } from "@/constants/paths";
import http from "@/lib/http";
import { ApiEndpoint } from "@/services/api-endpoint.service";
import { IUser } from "@/types/all";
import { create } from "zustand";
import { Response } from "../types/response";

export type IAuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | null;

interface IAuthStore {
  user: IUser | null;
  status: IAuthStatus;
  setUser: (user: IUser) => void;
  logout: () => Promise<Response<{ is_logged_in: boolean }>>;
  login: (email: string, password: string) => Promise<Response<IUser>>;
  register: (
    email: string,
    password: string,
    full_name: string
  ) => Promise<Response<IUser>>;
  getMe: () => Promise<Response<IUser>>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isLoading: false,
  user: null,
  status: null,
  async getMe() {
    try {
      set({
        status: "loading",
      });

      const response = await http.get<Response<IUser>>(ApiEndpoint.getMe);

      if (response.success) {
        set({
          user: response.data,
          status: "authenticated",
        });
      } else {
        set({
          status: "unauthenticated",
        });
      }

      return response;
    } catch (error: any) {
      set({
        status: "unauthenticated",
      });

      return error;
    }
  },

  setUser(user) {
    set({ user });
  },

  async logout() {
    try {
      const response = await http.post(ApiEndpoint.logout);

      if (response.success) {
        if (typeof window !== undefined) {
          window.location.href = LOGIN_PATH;
        }
      }

      return response;
    } catch (error: any) {
      return error;
    }
  },

  async login(email, password) {
    try {
      const response = await http.post<Response<IUser>>(ApiEndpoint.login, {
        email,
        password,
      });

      if (response.success) {
        set({ user: response.data, status: "authenticated" });
      }

      return response;
    } catch (error: any) {
      return error;
    }
  },

  async register(email, password, full_name) {
    try {
      const response = await http.post<Response<IUser>>(ApiEndpoint.register, {
        email,
        password,
        full_name,
      });

      if (response.success) {
        set({ user: response.data, status: "authenticated" });
      }

      return response;
    } catch (error: any) {
      return error;
    }
  },
}));
