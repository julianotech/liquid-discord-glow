import { API_URL } from "./routes";

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

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; data: T; message?: string }> {
  const token = localStorage.getItem("adminToken");

  // Não incluir Content-Type em requisições DELETE ou GET sem body
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

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
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
