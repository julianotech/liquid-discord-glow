import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassHeader } from "@/components/GlassHeader";
import { Card } from "@/components/ui/card";
import { UtensilsCrossed, Car, Home, Film, Heart, DollarSign, TrendingUp, Plus, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  
  const expenseCategories = [
    { id: 1, name: "Alimentos", icon: UtensilsCrossed, color: "bg-red-500/20", iconColor: "text-red-500" },
    { id: 2, name: "Transporte", icon: Car, color: "bg-blue-500/20", iconColor: "text-blue-500" },
    { id: 3, name: "Moradia", icon: Home, color: "bg-green-500/20", iconColor: "text-green-500" },
    { id: 4, name: "Lazer", icon: Film, color: "bg-purple-500/20", iconColor: "text-purple-500" },
    { id: 5, name: "Saúde", icon: Heart, color: "bg-pink-500/20", iconColor: "text-pink-500" },
  ];

  const incomeCategories = [
    { id: 6, name: "Salário", icon: DollarSign, color: "bg-cyan-500/20", iconColor: "text-cyan-500" },
    { id: 7, name: "Investimentos", icon: TrendingUp, color: "bg-yellow-500/20", iconColor: "text-yellow-500" },
    { id: 8, name: "Outros", icon: Plus, color: "bg-gray-500/20", iconColor: "text-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <GlassHeader />
      
      <main className="relative z-10 p-4 pb-24">
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
              return (
                <Card key={category.id} className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all">
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

        {/* Income Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Ganhos</h2>
          <div className="space-y-3">
            {incomeCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all">
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
        <Button className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg">
          <Plus className="w-6 h-6" />
        </Button>
      </main>
    </div>
  );
};

export default Categories;
