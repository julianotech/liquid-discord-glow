import { TransactionItem } from "@/components/TransactionItem";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/api/use-categories-api";
import { useTransactions } from "@/hooks/api/use-transactions-api";
import { Category } from "@/lib/api/types";
import { Filter, Plus, Search, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const History = (): JSX.Element => {
  const [search, updateSearch] = useState<string>('');
  const [limit, setLimit] = useState<number>(6)
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get('categoryId');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(categoryIdFromUrl || undefined);
  const { data: categories = [] } = useCategories();
  const { data, isLoading, refetch } = useTransactions({ limit, search, categoryId: selectedCategoryId });
  const transactions = data?.data || [];
  const hasMore = data?.hasMore

  useEffect(() => {
    if (categoryIdFromUrl) {
      setSelectedCategoryId(categoryIdFromUrl);
    }
  }, [categoryIdFromUrl]);

  useEffect(() => {
    refetch();
  }, [search, selectedCategoryId]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Search Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Pesquisar"
              value={search}
              className="bg-input border border-input focus:ring-ring focus:ring-1 pl-10 pr-10"
              onChange={(e) => updateSearch(e.target.value)}
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  updateSearch("");
                  refetch();
                }}
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>

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
                <Select value={selectedCategoryId} onValueChange={(value: string): void => {
                  setSelectedCategoryId(value);
                  refetch();
                }}>
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

          <button
            className="w-12 h-12 rounded-full bg-card border border-border shadow-md flex items-center justify-center"
            disabled={isLoading || !hasMore}
            style={{ opacity: (isLoading || !hasMore) ? 0.5 : 1, cursor: (isLoading || !hasMore) ? 'not-allowed' : 'pointer' }}
          >
            <Plus
              className="w-5 h-5 text-foreground"
              onClick={(): void => {
                if (!isLoading && hasMore) {
                  setLimit(limit + 2);
                }
              }}
            />
          </button>
        </div>


        {/* Date Filters */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* <div>
            <p className="text-xs text-muted-foreground mb-2">Data Inicial</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-input border border-input focus:ring-ring focus:ring-1",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecionar</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card rounded-lg border border-border shadow-md" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div> */}

          {/* <div>
            <p className="text-xs text-muted-foreground mb-2">Data Final</p>
          </div> */}
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((transaction, index): JSX.Element => {
            // const showDateHeader = index === 0 || transactions[index - 1].date !== transaction.date;
            if (!transaction.id) {
              return (<span>sem transaçoies</span>)
            }
            return (
              <div key={transaction.id}>
                {/* {showDateHeader && (
                  <p className="text-sm text-muted-foreground mb-2 mt-4 first:mt-0">{new Date(transaction.date).toDateString()}</p>
                )} */}
                <TransactionItem transaction={transaction} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default History;
