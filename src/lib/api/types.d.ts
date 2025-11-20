export interface Transaction {
  id: string;
  type: "expense" | "income";
  category: string;
  amount: number;
  description?: string;
  date: Date;
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
}