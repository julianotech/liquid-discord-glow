import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddCategoryDialog = ({ open, onOpenChange }: AddCategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"expense" | "income">("expense"); // Adicionado

  const handleSave = () => {
    if (!categoryName) {
      toast({
        title: "Erro",
        description: "O nome da categoria não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Categoria adicionada",
      description: `A categoria '${categoryName}' (${categoryType === "expense" ? "Despesa" : "Receita"}) foi adicionada com sucesso.`,
    });
    setCategoryName(""); // Limpar o campo após adicionar
    onOpenChange(false);
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
