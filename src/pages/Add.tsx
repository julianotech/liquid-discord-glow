import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { transactionsAPI } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowDownCircle, ArrowUpCircle, CalendarIcon } from "lucide-react";
import { useState } from "react";

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

const Add = (): JSX.Element => {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = async (): Promise<void> => {
    if (!category || !amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await transactionsAPI.create({
        type,
        category,
        amount: parseFloat(amount),
        description,
        date,
      });

      toast({
        title: "Transação adicionada",
        description: `${type === "expense" ? "Despesa" : "Receita"} de R$ ${amount} em ${category}`,
      });

      // Reset form
      setCategory("");
      setAmount("");
      setDescription("");
      setDate(new Date());
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a transação",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Nova Transação</h1>
          <p className="text-sm text-muted-foreground">Adicione uma nova transação à sua carteira</p>
        </div>

        {/* Type Selection with Radio Buttons */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-lg p-6 space-y-3">
          <Label className="text-foreground font-medium">Tipo de Transação</Label>
          <RadioGroup value={type} onValueChange={(value: "expense" | "income"): void => {
            setType(value);
            setCategory("");
          }}>
            <div className="grid grid-cols-2 gap-3">
              <label
                htmlFor="expense"
                className={cn(
                  "flex items-center justify-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                  type === "expense"
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card/30 hover:border-border/80"
                )}
              >
                <RadioGroupItem value="expense" id="expense" className="sr-only" />
                <ArrowDownCircle className={cn(
                  "w-5 h-5",
                  type === "expense" ? "text-destructive" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-medium",
                  type === "expense" ? "text-destructive" : "text-foreground"
                )}>
                  Despesa
                </span>
              </label>

              <label
                htmlFor="income"
                className={cn(
                  "flex items-center justify-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                  type === "income"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card/30 hover:border-border/80"
                )}
              >
                <RadioGroupItem value="income" id="income" className="sr-only" />
                <ArrowUpCircle className={cn(
                  "w-5 h-5",
                  type === "income" ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-medium",
                  type === "income" ? "text-primary" : "text-foreground"
                )}>
                  Receita
                </span>
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* Form Fields */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-lg p-6 space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1">
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
              className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1"
              step="0.01"
              min="0"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-foreground">Descrição</Label>
            <Textarea
              placeholder="Adicione uma descrição..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1 resize-none"
              rows={3}
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
                    "w-full justify-start text-left font-normal bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1",
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
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            className="w-full h-12 text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adicionando..." : "Adicionar Transação"}
          </Button>
          <Button
            onClick={() => setIsCategoryDialogOpen(true)}
            variant="outline"
            className="w-full h-12 text-base font-medium"
          >
            Gerenciar Categorias
          </Button>
        </div>
      </div>

      <AddCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
      />
    </div>
  );
};

export default Add;
