import { useCategories } from "@/hooks/api/use-categories-api";
import { Category } from "@/lib/api/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const CategoryFilter = ({ emitRefetch }: { emitRefetch: (categoryId: string) => void }): JSX.Element => {
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get('categoryId');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(categoryIdFromUrl || undefined);

  const { data: categories = [] } = useCategories();

  function setFilter(categoryId: string): void {
    setSelectedCategoryId(categoryId);
    emitRefetch(categoryId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-12 h-12 rounded-full bg-card border border-border shadow-md flex items-center justify-center"
        >
          <Filter className="w-5 h-5 text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-3 bg-card rounded-lg border border-border shadow-md z-[10001]">
        <DropdownMenuLabel>Filtrar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Categoria</p>
          <Select
            value={selectedCategoryId}
            onValueChange={(val: string): void => setFilter(val)}>
            <SelectTrigger className="w-full bg-input border border-input focus:ring-ring focus:ring-1">
              <SelectValue placeholder="Todas as Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ss">Todas as Categorias</SelectItem>
              {categories.map((category: Category): JSX.Element => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}