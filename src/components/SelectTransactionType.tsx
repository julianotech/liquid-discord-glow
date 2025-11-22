import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Label } from "recharts";

type TransactionType = "expense" | "income"

interface SelectTransactionTypeProps {
  type: TransactionType
  emitType: (type: TransactionType) => void
  refetchCategories: (categoryId?: string) => void
}

export const SelectTransactionType = ({ type, emitType, refetchCategories }: SelectTransactionTypeProps): JSX.Element => {
  const isIcome = type === 'income'
  return (
    <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-lg p-6 space-y-3">
      <Label className="text-foreground font-medium">Tipo de Transação</Label>
      <RadioGroup value={type} onValueChange={(value: TransactionType): void => {
        emitType(value);
        refetchCategories("");
      }}>
        <div className="grid grid-cols-2 gap-3">
          <label
            htmlFor="expense"
            className={cn(
              "flex items-center justify-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
              isIcome
                ? "border-border bg-card/30 hover:border-border/80"
                : "border-destructive bg-destructive/10"
            )}
          >
            <RadioGroupItem value="expense" id="expense" className="sr-only" />
            <ArrowDownCircle className={cn(
              "w-5 h-5",
              isIcome
                ? "text-muted-foreground"
                : "text-destructive"
            )} />
            <span className={cn(
              "font-medium",
              !isIcome ? "text-destructive" : "text-foreground"
            )}>
              Despesa
            </span>
          </label>

          <label
            htmlFor="income"
            className={cn(
              "flex items-center justify-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
              isIcome
                ? "border-primary bg-primary/10"
                : "border-border bg-card/30 hover:border-border/80"
            )}
          >
            <RadioGroupItem value="income" id="income" className="sr-only" />
            <ArrowUpCircle className={cn(
              "w-5 h-5",
              isIcome ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "font-medium",
              isIcome ? "text-primary" : "text-foreground"
            )}>
              Receita
            </span>
          </label>
        </div>
      </RadioGroup>
    </div>)
}