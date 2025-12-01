import apiClient from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/routes";
import { Wallet } from "@/lib/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWallets() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async (): Promise<Wallet[]> => {
      const response = await apiClient<Wallet[]>(API_ENDPOINTS.wallets);
      return response.data;
    },
  });
}

export function useCreateWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string }): Promise<Wallet> => {
      const response = await apiClient<Wallet>(API_ENDPOINTS.wallets, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}

export function useJoinWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { code: string }): Promise<Wallet> => {
      const response = await apiClient<Wallet>(API_ENDPOINTS.walletsJoin, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}
