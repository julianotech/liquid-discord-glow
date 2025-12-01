import { API_URL } from "@/config/env";

export const API_ENDPOINTS = {
  // Login
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  register: "/api/auth/register",

  // Users
  me: "/api/auth/me",
  users: "/api/auth/users",

  // Wallets
  wallets: "/api/wallets",
  walletsById: (id: string): string => `/api/wallets/${id}`,
  walletsJoin: "/api/wallets/join",

  // Endpoints de CATEGORIAS
  categories: "/api/categories",
  categoriesById: (id: string): string => `/api/categories/${id}`,

  // Endpoints de TRANSAÇÕES
  transactions: "/api/transactions",
  transactionsById: (id: string): string => `/api/transactions/${id}`,
};
