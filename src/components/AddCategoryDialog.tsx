import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "@/hooks/api/use-categories-api";
import { toast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-dialog";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { IconPicker } from "./IconPicker";



interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdded?: () => void;
}

export const AddCategoryDialog = ({ open, onOpenChange, onCategoryAdded }: AddCategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"expense" | "income">("expense");
  const [goal, setGoal] = useState<string>("");
  const [icon, setIcon] = useState<string>("ShoppingCart");
  const [iconColor, setIconColor] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("#3b82f6");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createCategoryMutation = useCreateCategory();

  const handleSave = async () => {
    if (!categoryName) {
      toast({
        title: "Erro",
        description: "O nome da categoria não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createCategoryMutation.mutateAsync({
        title: categoryName,
        type: categoryType === "income",
        goal: goal || null,
        icon,
        iconColor,
        bgColor,
        userCreated: "current-user",
      });

      toast({
        title: "Categoria adicionada",
        description: `A categoria '${categoryName}' (${categoryType === "expense" ? "Despesa" : "Receita"}) foi adicionada com sucesso.`,
      });

      setCategoryName("");
      setGoal("");
      setIcon("ShoppingCart");
      setIconColor("#ffffff");
      setBgColor("#3b82f6");
      onCategoryAdded?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a categoria.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card rounded-lg border border-border shadow-md z-[10000]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Adicionar Categoria</DialogTitle>
        </DialogHeader>
        <Description>Essa categoria é o tipo que uma transação vai assumir</Description>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-foreground">Tipo</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCategoryType("expense")}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${categoryType === "expense"
                  ? "border-red-500 bg-red-500/10"
                  : "border-border bg-card/50 hover:border-border/80"
                  }`}
              >
                <ArrowDownCircle
                  className={categoryType === "expense" ? "text-red-500" : "text-muted-foreground"}
                  size={24}
                />
                <span className={categoryType === "expense" ? "text-red-500 font-medium" : "text-foreground"}>
                  Despesa
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCategoryType("income")}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${categoryType === "income"
                  ? "border-green-500 bg-green-500/10"
                  : "border-border bg-card/50 hover:border-border/80"
                  }`}
              >
                <ArrowUpCircle
                  className={categoryType === "income" ? "text-green-500" : "text-muted-foreground"}
                  size={24}
                />
                <span className={categoryType === "income" ? "text-green-500 font-medium" : "text-foreground"}>
                  Receita
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Nome da Categoria</Label>
            <Input
              placeholder="Nome da nova categoria"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="bg-input border border-input focus:ring-ring focus:ring-1"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Ícone</Label>
            <div className="space-y-3">
              <IconPicker
                value={icon}
                onChange={setIcon}
                iconColor={iconColor}
                bgColor={bgColor}
              />
              <div className="grid grid-cols-2 gap-3">
                <ColorPicker
                  label="Cor do Ícone"
                  value={iconColor}
                  onChange={setIconColor}
                />
                <ColorPicker
                  label="Cor de Fundo"
                  value={bgColor}
                  onChange={setBgColor}
                />
              </div>
            </div>
          </div>

          {categoryType === "expense" && (
            <div className="space-y-2">
              <Label className="text-foreground">Meta Mensal (Opcional)</Label>
              <Input
                type="number"
                placeholder="Ex: 500.00"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="bg-input border border-input focus:ring-ring focus:ring-1"
                step="0.01"
                min="0"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};