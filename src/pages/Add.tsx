import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import { SelectCategory } from "@/components/SelectCategory";
import { SelectTransactionType } from "@/components/SelectTransactionType";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/api/use-categories-api";
import { useCreateTransaction } from "@/hooks/api/use-transactions-api";
import { toast } from "@/hooks/use-toast";
import { Category } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  const { data: categories = [] } = useCategories();
  const oito = useCreateTransaction()


  const { incomeCategories, expenseCategories } = categories.reduce((acc, category) => {
    if (category.type) {
      acc.incomeCategories.push(category)
      return acc
    }
    acc.expenseCategories.push(category)
    return acc
  }, { incomeCategories: [] as Category[], expenseCategories: [] as Category[] })


  const handleSubmit = async (): Promise<void> => {
    if (!category || !amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    const form = {
      description,
      categoryId: category,
      amount,
      date,
    };

    setIsSubmitting(true);
    try {
      await oito.mutateAsync(form).then(res => {
        return res
      })

      toast({
        title: "Transação adicionada",
        description: `${type === "expense" ? "Despesa" : "Receita"} de R$ ${amount} em ${category}`,
      });

      // Reset form
      // setCategory("");
      // setAmount("");
      // setDescription("");
      // setDate(new Date());
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
        <SelectTransactionType type={type} emitType={setType} refetchCategories={setCategory} />

        {/* Form Fields */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-lg p-6 space-y-4">
          {/* Category Selection */}
          <SelectCategory type={type} emitCategory={(value: string): void => setCategory(value)} />


          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-foreground">Valor *</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e): void => setAmount(e.target.value)}
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
                  onSelect={(newDate: Date): void => newDate && setDate(newDate)}
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
            onClick={(): void => setIsCategoryDialogOpen(true)}
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


