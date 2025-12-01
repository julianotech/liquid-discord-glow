import { ColorPicker } from "@/components/ColorPicker";
import { IconPicker } from "@/components/IconPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "@/hooks/api/use-categories-api";
import { toast } from "@/hooks/use-toast";
import { ArrowDownCircle, ArrowLeft, ArrowUpCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"expense" | "income">("expense");
  const [goal, setGoal] = useState("");
  const [icon, setIcon] = useState("ShoppingCart");
  const [iconColor, setIconColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCategoryMutation = useCreateCategory();

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para a categoria.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const variables = {
        title: categoryName,
        type: categoryType === "income",
        icon,
        iconColor,
        bgColor,
        goal: categoryType === "expense" && goal ? goal : null,
      }
      // console.log({ variables })
      await createCategoryMutation.mutateAsync(variables);

      toast({
        title: "Categoria criada",
        description: `A categoria '${categoryName}' foi criada com sucesso.`,
      });

      // navigate("/categories");
    } catch (error) {
      toast({
        title: "Erro ao criar categoria",
        description: "Não foi possível criar a categoria. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-foreground">Nova Categoria</h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Category Name */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Nome da Categoria</Label>
            <Input
              value={categoryName}
              onChange={(e): void => setCategoryName(e.target.value)}
              placeholder="Ex: Alimentação, Salário..."
              className="bg-background/50 backdrop-blur-sm border border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg h-12"
            />
          </div>

          {/* Category Type */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Tipo</Label>
            <div className="flex gap-3">
              <button
                onClick={(): void => setCategoryType("expense")}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${categoryType === "expense"
                  ? "border-red-500 bg-red-500/10"
                  : "border-border/50 bg-background/50"
                  }`}
              >
                <ArrowDownCircle className={categoryType === "expense" ? "text-red-500" : "text-muted-foreground"} />
                <span className={categoryType === "expense" ? "text-red-500 font-semibold" : "text-muted-foreground"}>
                  Despesa
                </span>
              </button>
              <button
                onClick={() => setCategoryType("income")}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${categoryType === "income"
                  ? "border-green-500 bg-green-500/10"
                  : "border-border/50 bg-background/50"
                  }`}
              >
                <ArrowUpCircle className={categoryType === "income" ? "text-green-500" : "text-muted-foreground"} />
                <span className={categoryType === "income" ? "text-green-500 font-semibold" : "text-muted-foreground"}>
                  Receita
                </span>
              </button>
            </div>
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

          {/* Goal (only for expenses) */}
          {categoryType === "expense" && (
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Meta Mensal (R$)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={goal}
                onChange={(e): void => setGoal(e.target.value)}
                className="bg-background/50 backdrop-blur-sm border border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg h-12"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                Define um limite máximo de gastos para esta categoria. Você será alertado se ultrapassar.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={(): void => navigate("/categories")}
              className="flex-1 h-12 rounded-lg border-border/50 hover:bg-background/80"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar Categoria"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCategory;
