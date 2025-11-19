import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  currentGoal?: number;
}

export const EditCategoryDialog = ({ open, onOpenChange, categoryName, currentGoal }: EditCategoryDialogProps) => {
  const [goal, setGoal] = useState(currentGoal?.toString() || "");

  const handleSave = () => {
    toast({
      title: "Meta atualizada",
      description: `Meta de R$ ${goal} definida para ${categoryName}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card rounded-lg border border-border shadow-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Editar Categoria</DialogTitle>
        </DialogHeader>
        
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
