import { useCategories } from "@/hooks/api/use-categories-api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";

export const CategoryFilter = ({
  emitRefetch,
  selectedCategoryId,
  type,
}: { 
  emitRefetch: (categoryId: string | undefined) => void; 
  selectedCategoryId?: string;
  type?: "expense" | "income";
}): JSX.Element => {
  const [category, setCategory] = useState<string>(selectedCategoryId || "all");

  const { data: categories = [] } = useCategories({ type });
  const selectedCategoryObject = categories.find((cat) => cat.id === category);

  useEffect(() => {
    if (selectedCategoryId) {
      setCategory(selectedCategoryId);
    } else {
      setCategory("all");
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    // Reset category filter when type changes
    setCategory("all");
    emitRefetch(undefined);
  }, [type]);

  return (
    <Select 
      value={category} 
      onValueChange={(value) => {
        setCategory(value);
        emitRefetch(value === "all" ? undefined : value);
      }}
    >
      <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1">
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