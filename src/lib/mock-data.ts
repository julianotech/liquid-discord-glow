import { Category, Transaction } from "./api/types";

const now = new Date();

export const mockCategories: Category[] = [
  {
    id: "1",
    title: "Alimentação",
    type: false,
    goal: "500",
    icon: "utensils",
    iconColor: "#ef4444",
    bgColor: "#fee2e2",
    userCreated: "1",
    walletId: "1",
    createdAt: now,
    updatedAt: now,
    spent: 0
  },
  {
    id: "2",
    title: "Transporte",
    type: false,
    goal: "300",
    icon: "car",
    iconColor: "#3b82f6",
    bgColor: "#dbeafe",
    userCreated: "1",
    walletId: "1",
    createdAt: now,
    updatedAt: now,
    spent: 0
  },
  {
    id: "3",
    title: "Lazer",
    type: false,
    goal: "200",
    icon: "gamepad-2",
    iconColor: "#8b5cf6",
    bgColor: "#ede9fe",
    userCreated: "1",
    walletId: "1",
    createdAt: now,
    updatedAt: now,
    spent: 0
  },
  {
    id: "4",
    title: "Salário",
    type: true,
    goal: null,
    icon: "wallet",
    iconColor: "#10b981",
    bgColor: "#d1fae5",
    userCreated: "1",
    walletId: "1",
    createdAt: now,
    updatedAt: now,
    spent: 0
  },
  {
    id: "5",
    title: "Freelance",
    type: true,
    goal: null,
    icon: "briefcase",
    iconColor: "#06b6d4",
    bgColor: "#cffafe",
    userCreated: "1",
    walletId: "1",
    createdAt: now,
    updatedAt: now,
    spent: 0
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Almoço no restaurante",
    amount: 45.50,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: "1",
    type: "expense",
    icon: "utensils",
    createdAt: now
  },
  {
    id: "2",
    description: "Uber para o trabalho",
    amount: 25.00,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: "2",
    type: "expense",
    icon: "car",
    createdAt: now
  },
  {
    id: "3",
    description: "Cinema com amigos",
    amount: 60.00,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: "3",
    type: "expense",
    icon: "gamepad-2",
    createdAt: now
  },
  {
    id: "4",
    description: "Pagamento mensal",
    amount: 3500.00,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: "4",
    type: "income",
    icon: "wallet",
    createdAt: now
  },
  {
    id: "5",
    description: "Projeto web",
    amount: 800.00,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    category: "5",
    type: "income",
    icon: "briefcase",
    createdAt: now
  },
  {
    id: "6",
    description: "Supermercado",
    amount: 235.80,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    category: "1",
    type: "expense",
    icon: "utensils",
    createdAt: now
  }
];
