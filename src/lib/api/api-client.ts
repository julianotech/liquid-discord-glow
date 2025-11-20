import { API_URL } from "./routes";
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

export default apiClient;
