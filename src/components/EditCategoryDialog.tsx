import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { IconPicker } from "./IconPicker";
import { ColorPicker } from "./ColorPicker";

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  currentGoal?: number;
  selectedIcon: string;
  selectedColor: string;
  onSave: (icon: string, color: string, goal?: number) => void;
}

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  categoryName,
  currentGoal,
  selectedIcon,
  selectedColor,
  onSave,
}: EditCategoryDialogProps) => {
  const [goal, setGoal] = useState(currentGoal?.toString() || "");
  const [currentIcon, setCurrentIcon] = useState(selectedIcon);
  const [currentColor, setCurrentColor] = useState(selectedColor);

  useEffect(() => {
    setCurrentIcon(selectedIcon);
  }, [selectedIcon]);

  useEffect(() => {
    setCurrentColor(selectedColor);
  }, [selectedColor]);

  const handleSave = () => {
    onSave(currentIcon, currentColor, Number(goal));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card rounded-lg border border-border shadow-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Editar Categoria</DialogTitle>
        </DialogHeader>
        <Description>Atualizar os dados da categoria</Description>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-foreground">Nome da Categoria</Label>
            <Input
              value={categoryName}
              disabled
              className="bg-input border border-input focus:ring-ring focus:ring-1"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Ícone</Label>
            <IconPicker onSelectIcon={setCurrentIcon} selectedIcon={currentIcon} />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Cor</Label>
            <ColorPicker onSelectColor={setCurrentColor} selectedColor={currentColor} />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Meta Mensal (R$)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="bg-input border border-input focus:ring-ring focus:ring-1"
              step="0.01"
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              Define um limite máximo de gastos para esta categoria. Você será alertado se ultrapassar.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
