import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface AddTransactionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
  defaultType?: "expense" | "income";
}

const expenseCategories = [
  "Alimentos",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
];

const incomeCategories = [
  "Salário",
  "Investimentos",
  "Outros",
];

export const AddTransactionDrawer = ({ open, onOpenChange, defaultCategory, defaultType }: AddTransactionDrawerProps) => {
  const [type, setType] = useState<"expense" | "income">(defaultType || "expense");
  const [category, setCategory] = useState(defaultCategory || "");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const categories = type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = () => {
    if (!category || !amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Transação adicionada",
      description: `${type === "expense" ? "Despesa" : "Receita"} de R$ ${amount} em ${category}`,
    });

    // Reset form
    setCategory(defaultCategory || "");
    setAmount("");
    setDescription("");
    setDate(new Date());
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="glass-card border-white/10">
        <DrawerHeader>
          <DrawerTitle className="text-foreground">Adicionar Transação</DrawerTitle>
        </DrawerHeader>
        
        <div className="p-4 space-y-4">
          {/* Type Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Tipo</Label>
            <Select value={type} onValueChange={(value: "expense" | "income") => {
              setType(value);
              setCategory("");
            }}>
              <SelectTrigger className="glass-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Despesa</SelectItem>
                <SelectItem value="income">Receita</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-foreground">Valor *</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glass-input"
              step="0.01"
              min="0"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-foreground">Descrição</Label>
            <Input
              placeholder="Adicione uma descrição..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-foreground">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal glass-input",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-card border-white/10" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSubmit} className="w-full">
            Adicionar
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
