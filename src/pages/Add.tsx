import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import AddTransactionDrawer from "@/components/AddTransactionDrawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Add = () => {
  const [isTransactionDrawerOpen, setIsTransactionDrawerOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold text-foreground mb-8">O que você deseja adicionar?</h1>
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Button onClick={() => setIsTransactionDrawerOpen(true)} className="h-12 text-lg">
          Nova Transação
        </Button>
        <Button onClick={() => setIsCategoryDialogOpen(true)} className="h-12 text-lg" variant="outline">
          Nova Categoria
        </Button>
      </div>

      <AddTransactionDrawer
        open={isTransactionDrawerOpen}
        onOpenChange={setIsTransactionDrawerOpen}
      />
      <AddCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
      />
    </div>
  );
};

export default Add;
