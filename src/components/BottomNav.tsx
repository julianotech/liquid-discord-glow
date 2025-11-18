import { Home, Plus, History, LayoutGrid, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Visão Geral', icon: Home },
    { path: '/add', label: 'Adicionar', icon: Plus },
    { path: '/history', label: 'Histórico', icon: History },
    { path: '/categories', label: 'Categorias', icon: LayoutGrid },
    { path: '/settings', label: 'Config.', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-header border-t border-white/10">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-primary")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
