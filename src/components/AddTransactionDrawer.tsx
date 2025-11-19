import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

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

const AddTransactionDrawer = ({ open, onOpenChange, defaultCategory, defaultType }: AddTransactionDrawerProps) => {
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
      <DrawerContent className="bg-card rounded-lg border border-border shadow-md z-[10000]">
        <DrawerHeader>
          <DrawerTitle className="text-foreground">Adicionar Transação</DrawerTitle>
          <DrawerDescription>
            Adicione uma nova transação à sua carteira.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 space-y-4">
          {/* Type Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Tipo</Label>
            <Select value={type} onValueChange={(value: "expense" | "income") => {
              setType(value);
              setCategory("");
            }}>
              <SelectTrigger className="bg-input border border-input focus:ring-ring focus:ring-1 pointer-events-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="pointer-events-auto">
                <SelectItem value="expense">Despesa</SelectItem>
                <SelectItem value="income">Receita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-input border border-input focus:ring-ring focus:ring-1">
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
              className="bg-input border border-input focus:ring-ring focus:ring-1"
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
              className="bg-input border border-input focus:ring-ring focus:ring-1"
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
                    "w-full justify-start text-left font-normal bg-input border border-input focus:ring-ring focus:ring-1",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card rounded-lg border border-border shadow-md" align="start">
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
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;