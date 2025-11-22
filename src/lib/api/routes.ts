import { API_URL } from "@/config/env";

export const API_ENDPOINTS = {
  // Login
  login: "/api/auth/login",
  logout: "/api/auth/logout",

  // Users
  me: "/api/auth/me",
  users: "/api/auth/users",

  // Endpoints de CATEGORIAS
  categories: "/api/categories",
  categoriesById: (id: string): string => `/api/categories/${id}`,

  // Endpoints de TRANSAÇÕES
  transactions: "/api/transactions",
  transactionsById: (id: string): string => `/api/transactions/${id}`,
};
