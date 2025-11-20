import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/routes";


export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: number;
  lastLoginAt: string | null;
  createdAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "super_admin";
}

interface Response {
  success: boolean;
  data: AdminUser;
  message?: string;
}

// Hook para buscar todos os usuários
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<AdminUser[]> => {
      const response = await apiClient<AdminUser[]>(API_ENDPOINTS.users);
      return response.data;
    },
  });
}

// Hook para criar um usuário
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData): Promise<Response> => {
      const response = await apiClient<AdminUser>(API_ENDPOINTS.users, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      return response;
    },
    onSuccess: (): void => {
      // Invalidar a lista de usuários para recarregar
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Hook para deletar um usuário
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string): Promise<Response> => {
      const response = await apiClient<AdminUser>(`${API_ENDPOINTS.users}/${userId}`, {
        method: "DELETE",
      });
      return response as Response;
    },
    onSuccess: (): void => {
      // Invalidar a lista de usuários para recarregar
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
