import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useCreateTransaction } from "@/hooks/api/use-transactions-api";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { SelectCategory } from "./SelectCategory";
import { SelectTransactionType } from "./SelectTransactionType";
import { FormField } from "./shared/FormField";
import { DatePicker } from "./shared/DatePicker";
import { GlassCard } from "./shared/GlassCard";

interface AddTransactionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
  defaultType?: "expense" | "income";
}

const AddTransactionDrawer = ({ open, onOpenChange, defaultCategory, defaultType }: AddTransactionDrawerProps) => {
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
      await createTransaction.mutateAsync(form).then(res => {
        return res
      })

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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-card rounded-lg border border-border shadow-md z-[10000] max-h-[90vh]">
        <DrawerHeader className="flex-shrink-0">
          <DrawerTitle className="text-foreground">Adicionar Transação</DrawerTitle>
          <p className="text-sm text-muted-foreground">Adicione uma nova transação à sua carteira</p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
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

        <DrawerFooter className="flex-shrink-0">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
        <AddCategoryDialog
          open={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;