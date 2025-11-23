import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/api/use-categories-api";
import { Category } from "@/lib/api/types";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const SelectCategory = ({ type, emitCategory, selectedCategory }: { type: 'expense' | 'income' | 'all', emitCategory: (val: string) => void, selectedCategory: string }): JSX.Element => {
  const { data: categories = [] } = useCategories({ type });
  const [category, setCategory] = useState(null)
  const currentSelectedCategory = categories.find(cat => cat.id === selectedCategory);

  return (<div className="space-y-2">
    <Label className="text-foreground">Categoria *</Label>
    <Select value={selectedCategory} onValueChange={emitCategory}>
      <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1">
        <SelectValue>
          {currentSelectedCategory?.title || "Selecione uma categoria"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat: Category): JSX.Element => (
          <SelectItem
            key={cat.id}
            value={cat.id}
            onClick={(): void => setCategory(cat.id)}
          >
            {cat.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>)
}
