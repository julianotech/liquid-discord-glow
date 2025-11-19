import { LucideProps } from "lucide-react";
import { Card } from "./ui/card";

interface TransactionItemProps {
  transaction: {
    id: number;
    type: string;
    category: string;
    place: string;
    amount: number;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    date: string;
  }
}

export const TransactionItem = ({ transaction }: TransactionItemProps): JSX.Element => {
  const Icon = transaction.icon;
  return (
    <Card className="bg-card rounded-lg border border-border shadow-md p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{transaction.category}</p>
          <p className="text-sm text-muted-foreground">{transaction.place}</p>
        </div>
        <p className={`font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-foreground'}`}>
          {transaction.type === 'income' ? '+' : '-'} R$ {Math.abs(transaction.amount).toFixed(2)}
        </p>
      </div>
    </Card>
  )
}