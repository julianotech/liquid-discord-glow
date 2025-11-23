import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import CategoryItem from "@/components/CategoryItem";
import { EditCategoryDialog } from "@/components/EditCategoryDialog";
import * as Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCategories, useUpdateCategory } from "@/hooks/api/use-categories-api";
import { Category } from "@/lib/api/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = (): JSX.Element => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const expenseCategories: Category[] = [];
  const incomeCategories: Category[] = [];
  const { data: categories = [], refetch: refetchCategories } = useCategories();
  const updateCategoryMutation = useUpdateCategory();

  const handleUpdateCategory = async (updatedIcon: string, updatedColor: string, updatedGoal?: number) => {
    if (selectedCategory) {
      try {
        await updateCategoryMutation.mutateAsync({
          id: selectedCategory.id,
          data: { ...selectedCategory, icon: updatedIcon, bgColor: updatedColor, goal: updatedGoal ? String(updatedGoal) : null },
        });
        toast({
          title: "Categoria atualizada",
          description: `A categoria '${selectedCategory.title}' foi atualizada com sucesso.`,
        });
        refetchCategories();
        setDialogOpen(false);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar a categoria.",
          variant: "destructive",
        });
      }
    }
  };

  for (const category of categories) {
    if (category.type) {
      incomeCategories.push(category);
      continue
    }
    expenseCategories.push(category);
  }

  const ArrowLeft = Icons.ArrowLeft;
  const Plus = Icons.Plus;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* <AnimatedBackground /> */}

      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={(): void => navigate('/')}
            className="text-foreground"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Categorias</h1>
        </div>

        {/* Expense Categories */}
        <CategoryItem
          title={"Gastos"}
          type={'expense'}
          categories={expenseCategories}

          whenClick={(categoryId: string) => navigate(`/history?categoryId=${categoryId}`)}
          onEditCategory={(category: Category): void => {
            setSelectedCategory(category);
            setDialogOpen(true);
          }}
        />
        {/* Income Categories */}
        <CategoryItem
          title={"Ganhos"}
          type={'income'}
          whenClick={(categoryId: string) => navigate(`/history?categoryId=${categoryId}`)}
          categories={incomeCategories}
          onEditCategory={(category) => {
            setSelectedCategory(category);
            setDialogOpen(true);
          }} />

        {/* Add Category Button */}
        <Button
          onClick={(): void => setAddCategoryOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main >

      <AddCategoryDialog
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
        onCategoryAdded={(): void => {
          // TODO: Refresh categories list
          console.log("Category added, should refresh list");
        }}
      />

      {selectedCategory && (
        <EditCategoryDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setSelectedCategory(undefined);
            }
          }}
          categoryName={selectedCategory.title}
          currentGoal={Number(selectedCategory.goal) || undefined}
          selectedIcon={selectedCategory.icon || ""}
          selectedColor={selectedCategory.bgColor || ""}
          onSave={handleUpdateCategory}
        />
      )}
    </div >
  );
};


export default Categories;
