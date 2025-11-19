import AddTransactionDrawer from "@/components/AddTransactionDrawer";
import { InfoCard } from "@/components/InfoCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, UtensilsCrossed, Wallet } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [isTransactionDrawerOpen, setIsTransactionDrawerOpen] = useState(false);
  const transactions = [
    { id: 1, type: "expense", category: "Compras", place: "Supermercado", amount: -150.00, icon: ShoppingCart, date: '' },
    { id: 2, type: "income", category: "Pagamento", place: "Salário", amount: 2500.00, icon: Wallet, date: '' },
    { id: 3, type: "expense", category: "Jantar", place: "Restaurante", amount: -80.00, icon: UtensilsCrossed, date: '' },
  ];

  const monthData = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    //  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Header with title and add button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
          <Button size="icon" className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90" onClick={() => setIsTransactionDrawerOpen(true)}>
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoCard text="Receitas" value={"3.500,00"} />
          <InfoCard text="Despesas" value={"2.250,00"} />
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Transações Recentes</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </main>
      <AddTransactionDrawer
        open={isTransactionDrawerOpen}
        onOpenChange={setIsTransactionDrawerOpen}
      />
    </div>
  );
};

export default Dashboard;
