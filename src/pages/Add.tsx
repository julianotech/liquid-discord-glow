import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import { SelectCategory } from "@/components/SelectCategory";
import { SelectTransactionType } from "@/components/SelectTransactionType";
import { Button } from "@/components/ui/button";
import { useCreateTransaction } from "@/hooks/api/use-transactions-api";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormField } from "@/components/shared/FormField";
import { DatePicker } from "@/components/shared/DatePicker";
import { GlassCard } from "@/components/shared/GlassCard";

const Add = (): JSX.Element => {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTransaction = useCreateTransaction();


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
      await createTransaction.mutateAsync(form);

      toast({
        title: "Transação adicionada",
        description: `${type === "expense" ? "Despesa" : "Receita"} de R$ ${amount} em ${category}`,
      });

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

        <SelectTransactionType type={type} emitType={setType} refetchCategories={() => setCategory("")} />

        <GlassCard className="p-6 space-y-4">
          <SelectCategory type={type} emitCategory={(value: string): void => setCategory(value)} />

          <FormField
            label="Valor *"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="0.00"
            step="0.01"
            min="0"
          />

          <FormField
            label="Descrição"
            type="textarea"
            value={description}
            onChange={setDescription}
            placeholder="Adicione uma descrição..."
            rows={3}
          />

          <DatePicker
            label="Data"
            date={date}
            onDateChange={(newDate) => newDate && setDate(newDate)}
          />
        </GlassCard>

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


