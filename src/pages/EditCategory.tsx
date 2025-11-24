import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconPicker } from "@/components/IconPicker";
import { ColorPicker } from "@/components/ColorPicker";
import { ArrowLeft } from "lucide-react";
import { useCategories, useUpdateCategory } from "@/hooks/api/use-categories-api";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: categories = [] } = useCategories();
  const updateCategoryMutation = useUpdateCategory();

  const category = categories.find((cat) => cat.id === id);

  const [goal, setGoal] = useState("");
  const [icon, setIcon] = useState("");
  const [iconColor, setIconColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setIcon(category.icon || "ShoppingCart");
      setBgColor(category.bgColor || "#3b82f6");
      setGoal(category.goal || "");
    }
  }, [category]);

  const handleSave = async () => {
    if (!category) return;

    setIsSubmitting(true);

    try {
      await updateCategoryMutation.mutateAsync({
        id: category.id,
        data: { 
          ...category, 
          icon, 
          bgColor, 
          goal: goal ? String(goal) : null 
        },
      });

      toast({
        title: "Categoria atualizada",
        description: `A categoria '${category.title}' foi atualizada com sucesso.`,
      });

      navigate("/categories");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a categoria.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Categoria não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/categories")}
            className="text-foreground"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Editar Categoria</h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Category Name (disabled) */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Nome da Categoria</Label>
            <Input
              value={category.title}
              disabled
              className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg h-12 opacity-60"
            />
          </div>

          {/* Icon and Colors */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Ícone e Cores</Label>
            <div className="flex items-center gap-4">
              <IconPicker 
                value={icon} 
                onChange={setIcon}
                iconColor={iconColor}
                bgColor={bgColor}
              />
              <div className="flex-1 space-y-3">
                <ColorPicker 
                  value={bgColor} 
                  onChange={setBgColor}
                  label="Cor de Fundo"
                />
                <ColorPicker 
                  value={iconColor} 
                  onChange={setIconColor}
                  label="Cor do Ícone"
                />
              </div>
            </div>
          </div>

          {/* Goal */}
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/categories")}
              className="flex-1 h-12 rounded-lg border-border/50 hover:bg-background/80"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditCategory;
