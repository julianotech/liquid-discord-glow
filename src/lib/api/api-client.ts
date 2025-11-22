import { API_URL, IS_MOCK_MODE } from "@/config/env";
import { mockCategories, mockTransactions } from "@/lib/mock-data";
import { K } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ReqMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface ReqInfo {
  method?: ReqMethods
  queryParams?: Record<string, string | number>
  body?: string
}

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit & ReqInfo
): Promise<K<T>> {
  // Mock mode
  if (IS_MOCK_MODE) {
    return handleMockRequest<T>(endpoint, options);
  }

  const token = localStorage.getItem("adminToken");

  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  // Só adicionar Content-Type se houver body
  if (options?.body) {
    headers["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    ...options,
    headers,
  };
  let finalEndpoint = endpoint;
  if (options?.queryParams) {
    const searchParams = new URLSearchParams();
    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();

    if (queryString) {
      finalEndpoint += (finalEndpoint.includes('?') ? '&' : '?') + queryString;
    }
  }

  try {
    const response = await fetch(`${API_URL}${finalEndpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", {
        endpoint,
        status: response.status,
        data,
      });
      throw new ApiError(data.message || "Erro na requisição", response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Network/Parse Error:", error);
    throw new ApiError("Erro de conexão ou parse", 0, error);
  }
}

function handleMockRequest<T>(endpoint: string, options?: RequestInit & ReqInfo): Promise<K<T>> {
  return new Promise((resolve) => {
    setTimeout((): void => {
      let mockData: unknown = [];

      // Categories
      if (endpoint.includes('/api/categories')) {
        if (options?.method === 'POST') {
          const newCategory = JSON.parse(options.body || '{}');
          mockCategories.push({ ...newCategory, id: String(mockCategories.length + 1) });
          mockData = newCategory;
        } else if (options?.method === 'PUT') {
          const categoryId = endpoint.split('/').pop();
          const index = mockCategories.findIndex(c => c.id === categoryId);
          if (index !== -1) {
            Object.assign(mockCategories[index], JSON.parse(options.body || '{}'));
            mockData = mockCategories[index];
          }
        } else if (options?.method === 'DELETE') {
          const categoryId = endpoint.split('/').pop();
          const index = mockCategories.findIndex(c => c.id === categoryId);
          if (index !== -1) {
            mockCategories.splice(index, 1);
          }
          mockData = { success: true };
        } else {
          const type = options?.queryParams?.type;
          mockData = type !== undefined
            ? mockCategories.filter(c => c.type === Boolean(Number(type)))
            : mockCategories;
        }
      }

      // Transactions
      if (endpoint.includes('/api/transactions')) {
        if (options?.method === 'POST') {
          const newTransaction = JSON.parse(options.body || '{}');
          const category = mockCategories.find(c => c.id === newTransaction.categoryId);
          mockTransactions.push({
            ...newTransaction,
            id: String(mockTransactions.length + 1),
            type: category?.type ? 'income' : 'expense',
            category
          });
          mockData = newTransaction;
        } else if (options?.method === 'PUT') {
          const transactionId = endpoint.split('/').pop();
          const index = mockTransactions.findIndex(t => t.id === transactionId);
          if (index !== -1) {
            Object.assign(mockTransactions[index], JSON.parse(options.body || '{}'));
            mockData = mockTransactions[index];
          }
        } else if (options?.method === 'DELETE') {
          const transactionId = endpoint.split('/').pop();
          const index = mockTransactions.findIndex(t => t.id === transactionId);
          if (index !== -1) {
            mockTransactions.splice(index, 1);
          }
          mockData = { success: true };
        } else {
          const { categoryId, search, limit = 10 } = options?.queryParams || {};
          let filtered = [...mockTransactions];

          if (categoryId) {
            filtered = filtered.filter(t => t.category === categoryId);
          }
          if (search) {
            filtered = filtered.filter(t =>
              t.description.toLowerCase().includes(String(search).toLowerCase())
            );
          }

          mockData = filtered.slice(0, Number(limit));
        }
      }

      resolve({
        data: mockData as T,
        hasMore: false,
        message: "Mock data"
      } as K<T>);
    }, 300);
  });
}

export default apiClient;
