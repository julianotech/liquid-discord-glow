import apiClient from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "super_admin";
  isActive: number;
  lastLoginAt: string | null;
  createdAt: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Hook para fazer login
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await apiClient<LoginResponse>(API_ENDPOINTS.login, {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      return response.data;
    },
    onSuccess: (data): void => {
      // Armazenar token e usuário
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      // Atualizar cache do usuário atual
      queryClient.setQueryData(["auth", "me"], data.user);
    },
  });
}

// Hook para verificar usuário logado
export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async (): Promise<User> => {
      const response = await apiClient<User>(API_ENDPOINTS.me);
      return response.data;
    },
    enabled: !!localStorage.getItem("adminToken"),
    retry: false,
  });
}

// Hook para logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Aqui você pode adicionar uma chamada à API se tiver endpoint de logout
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    },
    onSuccess: (): void => {
      // Limpar todo o cache
      queryClient.clear();
    },
  });
}
