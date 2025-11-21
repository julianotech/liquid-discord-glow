import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { IconPicker } from "./IconPicker";
import { ColorPicker } from "./ColorPicker";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

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
  const [currentIconColor, setCurrentIconColor] = useState("#ffffff");
  const [currentBgColor, setCurrentBgColor] = useState(selectedColor);

  useEffect(() => {
    setCurrentIcon(selectedIcon);
  }, [selectedIcon]);

  useEffect(() => {
    setCurrentBgColor(selectedColor);
  }, [selectedColor]);

  const handleSave = () => {
    onSave(currentIcon, currentBgColor, Number(goal));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-bold">Editar Categoria</DialogTitle>
          <Description className="text-muted-foreground text-sm">Atualizar os dados da categoria</Description>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Nome da Categoria</Label>
            <Input
              value={categoryName}
              disabled
              className="bg-background/50 backdrop-blur-sm border border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Ícone e Cores</Label>
            <div className="flex items-center gap-4">
              <IconPicker 
                value={currentIcon} 
                onChange={setCurrentIcon}
                iconColor={currentIconColor}
                bgColor={currentBgColor}
              />
              <div className="flex-1 space-y-3">
                <ColorPicker 
                  value={currentBgColor} 
                  onChange={setCurrentBgColor}
                  label="Cor de Fundo"
                />
                <ColorPicker 
                  value={currentIconColor} 
                  onChange={setCurrentIconColor}
                  label="Cor do Ícone"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Meta Mensal (R$)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="bg-background/50 backdrop-blur-sm border border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg h-12"
              step="0.01"
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              Define um limite máximo de gastos para esta categoria. Você será alertado se ultrapassar.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 rounded-lg border-border/50 hover:bg-background/80"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
