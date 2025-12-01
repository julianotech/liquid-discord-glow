export interface Transaction {
  id: string;
  type: "expense" | "income";
  category: string;
  amount: number;
  description?: string;
  date: Date;
  icon: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  spent: number;
  type: boolean;
  goal: string | null;
  icon: string | null;
  iconColor: string | null;
  bgColor: string | null;
  userCreated: string;
  walletId: string;
}

export interface Wallet {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  hasMore?: boolean;
  total?: number
};

export type K<T> = ApiResponse<T>;
