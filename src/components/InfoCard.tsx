import { toLocaleCurrency } from "@/lib/utils";
import { Card } from "./ui/card";

export const InfoCard = ({ value, type }: { value: string | number, type: 'income' | 'expense' }): JSX.Element => {
  const isIncome = type === 'income'
  const title = isIncome ? 'Receitas' : 'Despesas'
  return (
    <Card className={`bg-card/10 backdrop-blur-md rounded-lg hover:border-border/80 shadow-md border-b-4 p-6 ${isIncome ? 'border-indigo-900' : 'border-red-900 '}`}>
      <p className="text-muted-foreground text-sm mb-2">{title} (R$)</p>
      <p className="text-2xl font-bold text-foreground">{toLocaleCurrency(value)}</p>
    </Card>
  );
};