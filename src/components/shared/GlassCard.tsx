import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={cn(
      "bg-card/50 backdrop-blur-md border border-border/50 rounded-lg",
      className
    )}>
      {children}
    </div>
  );
};
