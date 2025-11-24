import CategoryItem from "@/components/CategoryItem";
import * as Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/api/use-categories-api";
import { Category } from "@/lib/api/types";
import { useNavigate } from "react-router-dom";

const Categories = (): JSX.Element => {
  const navigate = useNavigate();
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
            navigate(`/categories/${category.id}/edit`);
          }}
        />
        {/* Income Categories */}
        <CategoryItem
          title={"Ganhos"}
          type={'income'}
          whenClick={(categoryId: string) => navigate(`/history?categoryId=${categoryId}`)}
          categories={incomeCategories}
          onEditCategory={(category) => {
            navigate(`/categories/${category.id}/edit`);
          }} />

        {/* Add Category Button */}
        <Button
          onClick={(): void => navigate("/categories/new")}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </main >
    </div >
  );
};


export default Categories;
