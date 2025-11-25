import { toLocaleCurrency } from "@/lib/utils";
import { Card } from "./ui/card";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export const InfoCard = ({ 
  value, 
  type, 
  onClick 
}: { 
  value: string | number, 
  type: 'income' | 'expense',
  onClick?: () => void
}): JSX.Element => {
  const isIncome = type === 'income'
  const title = isIncome ? 'Receitas' : 'Despesas'
  
  return (
    <Card 
      className={`bg-card/50 backdrop-blur-md border border-border/50 rounded-lg p-6 space-y-3 transition-all hover:border-border/80 ${
        isIncome ? 'hover:shadow-green-500/10 hover:shadow-lg' : 'hover:shadow-red-500/10 hover:shadow-lg'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {isIncome ? (
          <ArrowUpCircle className="text-green-500" size={20} />
        ) : (
          <ArrowDownCircle className="text-red-500" size={20} />
        )}
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
      </div>
      <p className={`text-2xl font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
        R$ {toLocaleCurrency(value)}
      </p>
    </Card>
  );
};