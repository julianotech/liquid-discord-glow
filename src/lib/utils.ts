import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

const locales = 'pt-br'

export function toLocaleCurrency(value: string | number): string {
  return value.toLocaleString(locales, { minimumFractionDigits: 2 });
}
export function toLocaleCurrencyWithCoin(value: string | number, currency = 'BRL'): string {
  return Intl.NumberFormat(locales, { style: 'currency', currency }).format(Number(value))
}
