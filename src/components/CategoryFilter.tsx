import { useCategories } from "@/hooks/api/use-categories-api";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const CategoryFilter = ({
  emitRefetch,
  selectedCategoryId,
}: { emitRefetch: (categoryId: string | undefined) => void; selectedCategoryId?: string }): JSX.Element => {
  const [category, setCategory] = useState<string>(selectedCategoryId || "all");

  const { data: categories = [] } = useCategories();
  const selectedCategoryObject = categories.find((cat) => cat.id === category);

  return (
    <Select 
      value={category} 
      onValueChange={(value) => {
        setCategory(value);
        emitRefetch(value === "all" ? undefined : value);
      }}
    >
      <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1 w-12 h-12">
        <SelectValue>
          {category === "all" ? "Todas" : selectedCategoryObject?.title || "Filtro"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas</SelectItem>
        {categories.map((cat): JSX.Element => (
          <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};