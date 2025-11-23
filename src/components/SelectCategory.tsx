import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/api/use-categories-api";
import { Category } from "@/lib/api/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const SelectCategory = ({ 
  type, 
  emitCategory, 
  selectedCategory,
  label = "Categoria *"
}: { 
  type: 'expense' | 'income' | 'all', 
  emitCategory: (val: string) => void, 
  selectedCategory?: string,
  label?: string
}): JSX.Element => {
  const filterType = type === 'all' ? undefined : type;
  const { data: categories = [] } = useCategories({ type: filterType });
  const currentSelectedCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <Select value={selectedCategory || ""} onValueChange={emitCategory}>
        <SelectTrigger className="bg-input/50 backdrop-blur-sm border border-input focus:ring-ring focus:ring-1">
          <SelectValue placeholder="Selecione uma categoria">
            {currentSelectedCategory?.title || "Selecione uma categoria"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat: Category): JSX.Element => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
