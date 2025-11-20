// API integration for transactions and categories

import { Category, Transaction } from "./types";

// Transactions API
export const transactionsAPI = {
  async getAll(startDate?: Date, endDate?: Date): Promise<Transaction[]> {
    // TODO: Replace with actual API call
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());
    
    // Mock data for now
    return [];
  },

  async create(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
    // TODO: Replace with actual API call
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    return newTransaction;
  },

  async update(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    // TODO: Replace with actual API call
    return { ...transaction, id } as Transaction;
  },

  async delete(id: string): Promise<void> {
    // TODO: Replace with actual API call
    return;
  },
};

// Categories API
export const categoriesAPI = {
  async getAll(type?: "expense" | "income"): Promise<Category[]> {
    // TODO: Replace with actual API call
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    
    // Mock data for now
    return [];
  },

  async create(category: Omit<Category, 'id'>): Promise<Category> {
    // TODO: Replace with actual API call
    const newCategory = {
      ...category,
      id: Math.random().toString(36).substr(2, 9),
    };
    return newCategory;
  },

  async update(id: string, category: Partial<Category>): Promise<Category> {
    // TODO: Replace with actual API call
    return { ...category, id } as Category;
  },

  async delete(id: string): Promise<void> {
    // TODO: Replace with actual API call
    return;
  },
};
