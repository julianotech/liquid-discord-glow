import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import AddTransactionDrawer from "@/components/AddTransactionDrawer";
import CategoryItem from "@/components/CategoryItem";
import { EditCategoryDialog } from "@/components/EditCategoryDialog";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/api/use-categories-api";
import { Category } from "@/lib/api/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = (): JSX.Element => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"expense" | "income">("expense");

  const expenseCategories: Category[] = [];
  const incomeCategories: Category[] = [];
  const { data: categories = [] } = useCategories();

  for (const category of categories) {
    if (category.type) {
      incomeCategories.push(category);
      continue
    }
    expenseCategories.push(category);
  }

  const ArrowLeft = Icons.ArrowLeft;
  const ChevronRight = Icons.ChevronRight;
  const Plus = Icons.Plus;

  const handleCategoryClick = (categoryName: string, type: "expense" | "income"): void => {
    setSelectedCategory(categoryName);
    setSelectedType(type);
    setDrawerOpen(true);
  };

  const handleCategoryLongPress = (categoryName: string): void => {
    setSelectedCategory(categoryName);
    setDialogOpen(true);
  };

  const checkGoalExceeded = (category: Category): boolean => {
    return category.goal && category.spent > Number(category.goal);
  };

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
        <CategoryItem categories={expenseCategories} title={"Gastos"} type={'expense'} />
        {/* Income Categories */}
        <CategoryItem categories={incomeCategories} title={"Ganhos"} type={'income'} />

        {/* Add Category Button */}
        <Button
          onClick={(): void => setAddCategoryOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main >

      <AddTransactionDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        defaultCategory={selectedCategory}
        defaultType={selectedType}
      />

      <AddCategoryDialog
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
        onCategoryAdded={() => {
          // TODO: Refresh categories list
          console.log("Category added, should refresh list");
        }}
      />

      <EditCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categoryName={selectedCategory}
      />
    </div >
  );
};


export default Categories;
