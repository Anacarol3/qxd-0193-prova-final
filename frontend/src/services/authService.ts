import { api } from "../api";
import type { AuthData, User } from "../types";

export async function register(user: Omit<User, "id">): Promise<User | Error> {
  try {
    const response = await api.post(`/register`, user);
    return response.data.data;
  } catch (error) {
    return error as Error;
  }
}

export async function login(data: AuthData) {
  try {
    const response = await api.post(`/login`, data);
    return response.data.data;
  } catch (error) {
    return error as Error;
  }
}
export async function logout() {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "");
  localStorage.setItem("role", "");
  window.location.href = "/login";
}
