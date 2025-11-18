import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Search, Bell, ShoppingCart, Wallet, UtensilsCrossed, Car, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const History = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const transactions = [
    { id: 1, type: "expense", category: "Compras", place: "Supermercado", amount: -150.00, icon: ShoppingCart, date: "Hoje" },
    { id: 2, type: "income", category: "Pagamento", place: "Salário", amount: 2500.00, icon: Wallet, date: "Hoje" },
    { id: 3, type: "expense", category: "Jantar", place: "Restaurante", amount: -80.00, icon: UtensilsCrossed, date: "Ontem" },
    { id: 4, type: "expense", category: "Transporte", place: "Uber", amount: -45.00, icon: Car, date: "Ontem" },
    { id: 5, type: "expense", category: "Compras", place: "Farmácia", amount: -120.00, icon: ShoppingCart, date: "15/11" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Search Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar" 
              className="glass-input pl-10 bg-white/5"
            />
          </div>
          <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Date Filters */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Data Inicial</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal glass-input",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecionar</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-card border-white/10" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Data Final</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal glass-input",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy") : <span>Selecionar</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-card border-white/10" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((transaction, index) => {
            const Icon = transaction.icon;
            const showDateHeader = index === 0 || transactions[index - 1].date !== transaction.date;
            
            return (
              <div key={transaction.id}>
                {showDateHeader && (
                  <p className="text-sm text-muted-foreground mb-2 mt-4 first:mt-0">{transaction.date}</p>
                )}
                <Card className="glass-card p-4">
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default History;
