import { Button } from "@/components/ui/button";
import { Menu, Settings, User } from "lucide-react";

export const GlassHeader = () => {
  return (
    <header className="glass-header h-16 px-6 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="text-foreground font-semibold text-lg">LoginApp</span>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-4">
        <Button variant="glass" size="sm" className="text-sm">
          Sobre
        </Button>
        <Button variant="glass" size="sm" className="text-sm">
          Contato
        </Button>
        <Button variant="glass" size="sm" className="text-sm">
          Suporte
        </Button>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="glass" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
        <Button variant="glass" size="icon" className="hidden md:flex">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="glass" size="icon" className="hidden md:flex">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};