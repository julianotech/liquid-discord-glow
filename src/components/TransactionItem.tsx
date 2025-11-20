import { Transaction } from "@/lib/api/types";
import { toLocaleCurrencyWithCoin } from "@/lib/utils";
import { Icons } from "./Icons";
import { Card } from "./ui/card";

interface TransactionItemProps {
  transaction: Transaction
}

export const TransactionItem = ({ transaction }: TransactionItemProps): JSX.Element => {
  const Icon = Icons[transaction.icon];
  const isIncome = transaction.type === 'income'
  return (
    <Card className={`bg-card rounded-lg ${isIncome ? 'border-green-900' : 'border-red-900'} shadow-md p-4`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon
            className="w-6 h-6 text-primary"
          />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{transaction.category}</p>
          <p className="text-sm text-muted-foreground">{transaction.description}</p>
        </div>
        <p className="font-bold">
          {isIncome ? '+' : '-'} {toLocaleCurrencyWithCoin(transaction.amount)}
        </p>
      </div>
    </Card>
  )
}