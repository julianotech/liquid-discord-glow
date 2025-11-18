import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { UtensilsCrossed, Car, Home, Film, Heart, DollarSign, TrendingUp, Plus, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AddTransactionDrawer } from "@/components/AddTransactionDrawer";
import { EditCategoryDialog } from "@/components/EditCategoryDialog";
import { cn } from "@/lib/utils";

const Categories = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"expense" | "income">("expense");
  
  const expenseCategories = [
    { id: 1, name: "Alimentos", icon: UtensilsCrossed, color: "bg-red-500/20", iconColor: "text-red-500", goal: 500, spent: 350 },
    { id: 2, name: "Transporte", icon: Car, color: "bg-blue-500/20", iconColor: "text-blue-500", goal: 300, spent: 320 },
    { id: 3, name: "Moradia", icon: Home, color: "bg-green-500/20", iconColor: "text-green-500", goal: 1000, spent: 1000 },
    { id: 4, name: "Lazer", icon: Film, color: "bg-purple-500/20", iconColor: "text-purple-500", goal: 200, spent: 150 },
    { id: 5, name: "Saúde", icon: Heart, color: "bg-pink-500/20", iconColor: "text-pink-500", goal: 400, spent: 280 },
  ];

  const incomeCategories = [
    { id: 6, name: "Salário", icon: DollarSign, color: "bg-cyan-500/20", iconColor: "text-cyan-500" },
    { id: 7, name: "Investimentos", icon: TrendingUp, color: "bg-yellow-500/20", iconColor: "text-yellow-500" },
    { id: 8, name: "Outros", icon: Plus, color: "bg-gray-500/20", iconColor: "text-gray-500" },
  ];

  const handleCategoryClick = (categoryName: string, type: "expense" | "income") => {
    setSelectedCategory(categoryName);
    setSelectedType(type);
    setDrawerOpen(true);
  };

  const handleCategoryLongPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setDialogOpen(true);
  };

  const checkGoalExceeded = (category: typeof expenseCategories[0]) => {
    if (category.goal && category.spent > category.goal) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-foreground"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Categorias</h1>
        </div>

        {/* Expense Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Gastos</h2>
          <div className="space-y-3">
            {expenseCategories.map((category) => {
              const Icon = category.icon;
              const isOverGoal = checkGoalExceeded(category);
              return (
                <Card 
                  key={category.id} 
                  className={cn(
                    "glass-card p-4 cursor-pointer hover:bg-white/10 transition-all",
                    isOverGoal && "border-red-500/50"
                  )}
                  onClick={() => handleCategoryClick(category.name, "expense")}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleCategoryLongPress(category.name);
                  }}
                  onTouchStart={(e) => {
                    const touchTimer = setTimeout(() => {
                      handleCategoryLongPress(category.name);
                    }, 500);
                    (e.currentTarget as any).touchTimer = touchTimer;
                  }}
                  onTouchEnd={(e) => {
                    if ((e.currentTarget as any).touchTimer) {
                      clearTimeout((e.currentTarget as any).touchTimer);
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{category.name}</p>
                      {category.goal && (
                        <div className="mt-1">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>R$ {category.spent.toFixed(2)}</span>
                            <span>R$ {category.goal.toFixed(2)}</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full transition-all",
                                isOverGoal ? "bg-red-500" : "bg-primary"
                              )}
                              style={{ width: `${Math.min((category.spent / category.goal) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {isOverGoal && (
                    <p className="text-xs text-red-500 mt-2">⚠️ Meta excedida!</p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Income Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Ganhos</h2>
          <div className="space-y-3">
            {incomeCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => handleCategoryClick(category.name, "income")}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleCategoryLongPress(category.name);
                  }}
                  onTouchStart={(e) => {
                    const touchTimer = setTimeout(() => {
                      handleCategoryLongPress(category.name);
                    }, 500);
                    (e.currentTarget as any).touchTimer = touchTimer;
                  }}
                  onTouchEnd={(e) => {
                    if ((e.currentTarget as any).touchTimer) {
                      clearTimeout((e.currentTarget as any).touchTimer);
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <p className="font-medium text-foreground flex-1">{category.name}</p>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Add Category Button */}
        <Button 
          onClick={() => {
            setSelectedCategory("");
            setDrawerOpen(true);
          }}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main>

      <AddTransactionDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen}
        defaultCategory={selectedCategory}
        defaultType={selectedType}
      />

      <EditCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categoryName={selectedCategory}
      />
    </div>
  );
};

export default Categories;
