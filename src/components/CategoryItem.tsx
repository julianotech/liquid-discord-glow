import { Category } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { ChevronRight, Pencil } from "lucide-react";
import * as Icons from "./Icons";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Type = "expense" | "income"

export default function CategoryItem({
  categories,
  title,
  type,
  onEditCategory,
  whenClick
}: { categories: Category[], title: string, type: Type, onEditCategory: (category: Category) => void, whenClick: (categoryId: string) => void }): JSX.Element {
  const isExpense = type === 'expense'

  const checkGoalExceeded = (category: Category): boolean => {
    return category.goal && category.spent > Number(category.goal);
  };

  const Message = (): JSX.Element => {
    const message = !isExpense ? '✅ Meta alcançada' : '⚠️ Meta excedida!'
    const className = !isExpense ? 'text-xs mt-2 text-green-500 mt-2' : 'text-xs mt-2 text-red-500'

    return (
      <p className={className}>{message}</p>
    );
  }

  function getBg(isOverGoal: boolean) {
    if (isOverGoal) {
      if (isExpense) {
        return `bg-red-500`
      }
      return `bg-green-500`
    }
    return "bg-primary"
  }

  function getBorder(isOverGoal: boolean) {
    if (isOverGoal) {
      if (isExpense) {
        return `border-red-500`
      }

      return `border-green-500`
    }

  }

  return (<div className="mb-8">
    <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
    <div className="space-y-3">
      {categories.map((category: Category): JSX.Element => {
        const IconComponent = Icons[category.icon];
        const Icon = IconComponent || Icons.AlertTriangle;
        const isOverGoal = checkGoalExceeded(category);
        const bgIsColor = typeof category.bgColor === "string" && (category.bgColor.startsWith("#") || category.bgColor.startsWith("rgb"));
        const iconIsColor = typeof category.iconColor === "string" && (category.iconColor.startsWith("#") || category.iconColor.startsWith("rgb"));
        return (
          <Card
            key={category.id}
            className={cn(
              "glass-card p-4 cursor-pointer hover:bg-white/10 transition-all",
              getBorder(isOverGoal)
            )}
            onClick={(): void => whenClick(category.id)}
          // onContextMenu={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
          //   e.preventDefault();
          // }}
          // onTouchStart={(e: React.TouchEvent<HTMLDivElement> & { currentTarget: { touchTimer?: NodeJS.Timeout } }): void => {
          //   const touchTimer = setTimeout((): void => {
          //   }, 500);
          //   e.currentTarget.touchTimer = touchTimer;
          // }}
          // onTouchEnd={(e: React.TouchEvent<HTMLDivElement> & { currentTarget: { touchTimer?: NodeJS.Timeout } }): void => {
          //   if (e.currentTarget.touchTimer) {
          //     clearTimeout(e.currentTarget.touchTimer);
          //   }
          // }}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  bgIsColor ? undefined : category.bgColor
                )}
                style={bgIsColor ? { backgroundColor: category.bgColor } : undefined}
              >
                <Icon
                  className={cn("w-6 h-6", iconIsColor ? undefined : category.iconColor)}
                  style={iconIsColor ? { color: category.iconColor } : undefined}
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground flex-1">{category.title}</p>
                {category.goal && (
                  <div className="mt-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>R$ {Number(category.spent).toFixed(2)}</span>
                      <span>R$ {Number(category.goal).toFixed(2)}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          getBg(isOverGoal)
                        )}
                        style={{ width: `${Math.min((Number(category.spent) / Number(category.goal)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation(); // Previne o clique na Card de abrir o drawer
                onEditCategory(category);
              }}>
                <Pencil className="w-5 h-5 text-muted-foreground" />
              </Button>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            {isOverGoal && <Message />}

          </Card>
        );
      })}
    </div>
  </div>
  )
}