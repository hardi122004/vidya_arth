import axios, { AxiosError } from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("techtrek-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiErrorPayload {
  detail?: string | { msg: string }[];
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorPayload | undefined;
    if (typeof data?.detail === "string") return data.detail;
    if (Array.isArray(data?.detail) && data.detail.length > 0) return data.detail[0].msg;
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export interface SignupPayload {
  full_name: string;
  date_of_birth: string;
  role: "student" | "parent" | "teacher";
  email?: string;
  phone_number?: string;
  password?: string;
  guardian_name?: string;
  guardian_email?: string;
  guardian_phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  full_name: string;
  date_of_birth: string;
  age: number;
  role: string;
  is_minor: boolean;
  email: string | null;
  phone_number: string | null;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export const authApi = {
  signup: (payload: SignupPayload) => api.post<AuthResponse>("/signup", payload),
  login: (payload: LoginPayload) => api.post<AuthResponse>("/login", payload),
  logout: () => api.post("/logout"),
  profile: () => api.get<UserProfile>("/profile"),
};
