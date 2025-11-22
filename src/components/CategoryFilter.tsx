import { useCategories } from "@/hooks/api/use-categories-api";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const CategoryFilter = ({ emitRefetch }: { emitRefetch: (categoryId: string) => void }): JSX.Element => {
  const [category, setCategory] = useState<string>("");

  const { data: categories = [] } = useCategories();

  return (
    <Select 
      value={category} 
      onValueChange={(value) => {
        setCategory(value);
        emitRefetch(value);
      }}
    >
      <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1 w-12 h-12">
        <SelectValue placeholder="Filtro" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Todas</SelectItem>
        {categories.map((cat): JSX.Element => (
          <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};