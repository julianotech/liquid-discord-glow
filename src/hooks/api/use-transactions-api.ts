import apiClient from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/routes";
import { ApiResponse, Transaction } from "@/lib/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CreateTransactionData {
  description: string
}

// Interface para dados de atualização
export type UpdateTransactionData = Partial<CreateTransactionData>;

// --- Hooks Principais para Transações ---

// Hook para buscar todas as transações
export function useTransactions(queryParams: Record<string, string | number> = {}) {
  // 🎯 TIPAGEM: useQuery<Tipo do dado no cache, Tipo do erro, Tipo do dado que você quer usar>
  return useQuery<ApiResponse<Transaction[]>, Error, ApiResponse<Transaction[]>>({
    queryKey: ["transactions", queryParams],

    // queryFn deve retornar o objeto completo (ApiResponse<Transaction[]>)
    queryFn: async (): Promise<ApiResponse<Transaction[]>> => {
      const response = await apiClient<Transaction[]>(API_ENDPOINTS.transactions, {
        queryParams
      });
      return response; // Retorna o objeto completo: { data: [...], hasMore: true, ... }
    },
  });
}

// Hook para buscar uma Transação por ID
export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async (): Promise<Transaction> => {
      // Usando o endpoint de transações por ID
      const response = await apiClient<Transaction>(API_ENDPOINTS.transactionsById(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook para criar uma transação
export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (TransactionData: CreateTransactionData) => {
      // Endpoint POST para criar transação
      const response = await apiClient<Transaction>(API_ENDPOINTS.transactions, {
        method: "POST",
        body: JSON.stringify(TransactionData),
      });
      return response;
    },
    onSuccess: () => {
      // Invalidar a lista de categorias para recarregar
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

// Hook para atualizar uma transação
export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id: transactionId, data }: { id: string; data: UpdateTransactionData }) => {
      // Endpoint PUT para atualizar transação
      const response = await apiClient<Transaction>(API_ENDPOINTS.transactionsById(transactionId), {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: (_, variables) => {
      // Invalidar a transação específica e a lista
      queryClient.invalidateQueries({ queryKey: ["transactions", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

// Hook para deletar uma transação
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (TransactionId: string) => {
      // Endpoint DELETE para deletar transação
      const response = await apiClient(API_ENDPOINTS.transactionsById(TransactionId), {
        method: "DELETE",
      });
      return response;
    },
    onSuccess: (): void => {
      // Invalidar a lista de transações para recarregar
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
