import { cn } from "@/lib/utils";
import { History, Home, LayoutGrid, Plus, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNav = (): JSX.Element => {
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
    <nav className="fixed bottom-0 inset-x-0 z-[9999] bg-background border-t border-border">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item): JSX.Element => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={(): void => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] pointer-events-auto",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
