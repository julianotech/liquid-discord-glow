import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { categoriesAPI } from "@/lib/api";
import { useState } from "react";
import { IconPicker } from "./IconPicker";
import { ColorPicker } from "./ColorPicker";

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

  const handleSave = async () => {
    if (!categoryName) {
      toast({
        title: "Erro",
        description: "O nome da categoria não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    try {
      await categoriesAPI.create({
        title: categoryName,
        type: categoryType === "income",
        goal: goal || null,
        icon,
        iconColor,
        bgColor,
        spent: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card rounded-lg border border-border shadow-md z-[10000]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Adicionar Categoria</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-foreground">Tipo</Label>
            <Select value={categoryType} onValueChange={(value: "expense" | "income") => setCategoryType(value)}>
              <SelectTrigger className="bg-input border border-input focus:ring-ring focus:ring-1 pointer-events-auto">
                <SelectValue placeholder="Selecionar tipo" />
              </SelectTrigger>
              <SelectContent className="pointer-events-auto">
                <SelectItem value="expense">Despesa</SelectItem>
                <SelectItem value="income">Receita</SelectItem>
              </SelectContent>
            </Select>
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
            <div className="flex items-center gap-4">
              <IconPicker 
                value={icon} 
                onChange={setIcon}
                iconColor={iconColor}
                bgColor={bgColor}
              />
              <div className="flex-1 space-y-3">
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
          <Button onClick={handleSave}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
