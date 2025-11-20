import apiClient from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/routes";
import { Category } from "@/lib/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// Interface para o objeto de Campanha retornado pela API


export interface CreateCategoryData {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  type: boolean;
  goal?: string | null;
  icon?: string | null;
  iconColor?: string | null;
  bgColor?: string | null;
  userCreated: string;
}

// Interface para dados de atualização
export type UpdateCategoryData = Partial<CreateCategoryData>;

// --- Hooks Principais para Categorias ---

// Hook para buscar todas as categorias
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      // Usando o endpoint de categorias
      const response = await apiClient<Category[]>(API_ENDPOINTS.categories);
      return response.data;
    },
  });
}

// Hook para buscar uma categoria por ID
export function useCategory(id: string) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      // Usando o endpoint de categorias por ID
      const response = await apiClient<Category>(API_ENDPOINTS.categoriesById(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook para criar uma categoria
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData: CreateCategoryData) => {
      // Endpoint POST para criar categoria
      const response = await apiClient<Category>(API_ENDPOINTS.categories, {
        method: "POST",
        body: JSON.stringify(categoryData),
      });
      return response;
    },
    onSuccess: () => {
      // Invalidar a lista de categorias para recarregar
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

// Hook para atualizar uma categoria
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCategoryData }) => {
      // Endpoint PUT para atualizar categoria
      const response = await apiClient<Category>(API_ENDPOINTS.categoriesById(id), {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: (_, variables) => {
      // Invalidar a categoria específica e a lista
      queryClient.invalidateQueries({ queryKey: ["categories", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

// Hook para deletar uma categoria
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      // Endpoint DELETE para deletar categoria
      const response = await apiClient(API_ENDPOINTS.categoriesById(categoryId), {
        method: "DELETE",
      });
      return response;
    },
    onSuccess: (): void => {
      // Invalidar a lista de categorias para recarregar
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
