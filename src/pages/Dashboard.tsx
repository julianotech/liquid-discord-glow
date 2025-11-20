import AddTransactionDrawer from "@/components/AddTransactionDrawer";
import { InfoCard } from "@/components/InfoCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/api/use-transactions-api";
import { Transaction } from "@/lib/api/types";
import { Activity, Plus } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [isTransactionDrawerOpen, setIsTransactionDrawerOpen] = useState(false);

  const { data, isLoading } = useTransactions();
  const transactions = data?.data || [];
  const hasMore = data?.hasMore;
  const monthData = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    //  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  const [recordsToSee, setRecordsToSee] = useState<number>(3)

  const res = transactions.reduce((acc, trx) => {
    if (trx.type !== 'expense') {
      acc.receita += Number(trx.amount)
      return acc
    }
    acc.despesas += Number(trx.amount)
    return acc
  }, { receita: 0, despesas: 0 })
  console.log(res)
  const { receita, despesas } = res


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Header with title and add button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
          <Button size="icon" className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90" onClick={(): void => setIsTransactionDrawerOpen(true)}>
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoCard value={receita} type={'income'} />
          <InfoCard value={despesas} type={'expense'} />
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Transações Recentes</h2>
          <div className="space-y-3">
            {[...transactions.slice(0, recordsToSee)].map((transaction: Transaction): JSX.Element => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </main>
      <Activity onClick={(): void => setRecordsToSee(recordsToSee + 2)} />
      <AddTransactionDrawer
        open={isTransactionDrawerOpen}
        onOpenChange={setIsTransactionDrawerOpen}
      />
    </div>
  );
};

export default Dashboard;
