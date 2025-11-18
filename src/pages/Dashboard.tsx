import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassHeader } from "@/components/GlassHeader";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Wallet, UtensilsCrossed, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const transactions = [
    { id: 1, type: "expense", category: "Compras", place: "Supermercado", amount: -150.00, icon: ShoppingCart },
    { id: 2, type: "income", category: "Pagamento", place: "Salário", amount: 2500.00, icon: Wallet },
    { id: 3, type: "expense", category: "Jantar", place: "Restaurante", amount: -80.00, icon: UtensilsCrossed },
  ];

  const monthData = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <GlassHeader />
      
      <main className="relative z-10 p-4 pb-24">
        {/* Header with title and add button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
          <Button size="icon" className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90">
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="glass-card p-6">
            <p className="text-muted-foreground text-sm mb-2">Saldo</p>
            <p className="text-3xl font-bold text-foreground">R$ 1.250,00</p>
          </Card>
          <Card className="glass-card p-6">
            <p className="text-muted-foreground text-sm mb-2">Receita</p>
            <p className="text-3xl font-bold text-foreground">R$ 2.500,00</p>
          </Card>
        </div>

        {/* Expenses Chart */}
        <Card className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Despesas</p>
              <p className="text-4xl font-bold text-foreground">R$ 1.250,00</p>
              <p className="text-muted-foreground text-xs mt-1">Este Mês</p>
            </div>
            <div className="flex gap-4 text-sm">
              <button className="text-primary">Este Mês</button>
              <button className="text-muted-foreground">Mês Passado</button>
            </div>
          </div>
          
          {/* Simple bar chart */}
          <div className="flex items-end justify-between h-32 gap-2">
            {monthData.map((month, i) => (
              <div key={month} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-primary/20 rounded-t-lg transition-all"
                  style={{ height: `${30 + Math.random() * 70}%` }}
                />
                <p className="text-xs text-muted-foreground mt-2">{month}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Transações Recentes</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const Icon = transaction.icon;
              return (
                <Card key={transaction.id} className="glass-card p-4">
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
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
