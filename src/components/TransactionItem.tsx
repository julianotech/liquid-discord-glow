import { Transaction } from "@/lib/api/types";
import { toLocaleCurrencyWithCoin } from "@/lib/utils";
import * as Icons from "./Icons";
import { Card } from "./ui/card";

interface TransactionItemProps {
  transaction: Transaction
}

export const TransactionItem = ({ transaction }: TransactionItemProps): JSX.Element => {
  const IconComponent = Icons[transaction.icon];
  const Icon = IconComponent || Icons.AlertTriangle;
  const isIncome = transaction?.type === 'income'

  return (
    <Card 
      className={`bg-card/50 backdrop-blur-md border border-border/50 rounded-lg p-4 transition-all hover:border-border/80 cursor-pointer ${
        isIncome ? 'hover:shadow-green-500/10 hover:shadow-lg' : 'hover:shadow-red-500/10 hover:shadow-lg'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isIncome ? 'bg-green-500/10' : 'bg-red-500/10'
        }`}>
          <Icon
            className={`w-6 h-6 ${isIncome ? 'text-green-500' : 'text-red-500'}`}
          />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{transaction.category}</p>
          <p className="text-sm text-muted-foreground">{transaction.description}</p>
        </div>
        <p className={`font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
          {isIncome ? '+' : '-'} {toLocaleCurrencyWithCoin(transaction.amount)}
        </p>
      </div>
    </Card>
  )
}