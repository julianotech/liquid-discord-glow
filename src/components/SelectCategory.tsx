import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/api/use-categories-api";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const SelectCategory = ({ type, emitCategory }: { type: 'expense' | 'income' | 'all', emitCategory: (val: string) => void }): JSX.Element => {
  const [category, setCategory] = useState<string>("");

  const { data: categories = [], refetch: refetchCategories } = useCategories({ type });

  // const { incomeCategories, expenseCategories } = categories.reduce((acc, categoryItem) => {
  //   if (categoryItem.type) {
  //     acc.incomeCategories.push(categoryItem);
  //   } else {
  //     acc.expenseCategories.push(categoryItem);
  //   }
  //   return acc;
  // }, { incomeCategories: [] as Category[], expenseCategories: [] as Category[] });

  return (<div className="space-y-2">
    <Label className="text-foreground">Categoria *</Label>
    <Select value={category} onValueChange={emitCategory}>
      <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat): JSX.Element => (
          <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>)
}
