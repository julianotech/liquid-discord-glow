import { CategoryFilter } from "@/components/CategoryFilter";
import { TransactionItem } from "@/components/TransactionItem";
import { Input } from "@/components/ui/input";
import { useTransactions } from "@/hooks/api/use-transactions-api";
import { ArrowDownCircle, ArrowUpCircle, Plus, Search, XCircle, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const History = (): JSX.Element => {
  const [search, updateSearch] = useState<string>('');
  const [limit, setLimit] = useState<number>(6)
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get('categoryId');
  const [selectedCategoryId, selectCategory] = useState<string | undefined>(categoryIdFromUrl || undefined);
  const [selectedType, setSelectedType] = useState<"expense" | "income" | undefined>(undefined);
  const { data, isLoading, refetch } = useTransactions({ limit, search, categoryId: selectedCategoryId, type: selectedType });
  const transactions = data?.data || [];
  const hasMore = data?.hasMore

  const isFilterApplied = selectedCategoryId !== undefined || selectedType !== undefined;

  useEffect((): void => {
    if (categoryIdFromUrl) {
      selectCategory(categoryIdFromUrl);
    }
  }, [categoryIdFromUrl]);

  useEffect((): void => {
    refetch();
  }, [search, selectedCategoryId, selectedType]);

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
              onChange={(e): void => updateSearch(e.target.value)}
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
                className={cn(
                  "w-12 h-12 rounded-full bg-card border-2 border-border shadow-md flex items-center justify-center",
                  isFilterApplied && "border-orange-500"
                )}
              >
                <Filter className="w-5 h-5 text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-3 bg-card rounded-lg border border-border shadow-md z-[10001]">
              <DropdownMenuLabel>Filtrar</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="space-y-3 mb-4">
                <Label className="text-foreground font-medium">Tipo</Label>
                <RadioGroup value={selectedType} onValueChange={(value: "expense" | "income" | undefined): void => {
                  setSelectedType(value);
                  selectCategory(undefined); // Limpa a categoria ao mudar o tipo
                }}>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      htmlFor="filter-expense"
                      className={cn(
                        "flex items-center justify-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all",
                        selectedType === "expense"
                          ? "border-destructive bg-destructive/10"
                          : "border-border bg-card/30 hover:border-border/80"
                      )}
                    >
                      <RadioGroupItem value="expense" id="filter-expense" className="sr-only" />
                      <ArrowDownCircle className={cn(
                        "w-5 h-5",
                        selectedType === "expense" ? "text-destructive" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "font-medium",
                        selectedType === "expense" ? "text-destructive" : "text-foreground"
                      )}>
                        Despesa
                      </span>
                    </label>

                    <label
                      htmlFor="filter-income"
                      className={cn(
                        "flex items-center justify-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all",
                        selectedType === "income"
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card/30 hover:border-border/80"
                      )}
                    >
                      <RadioGroupItem value="income" id="filter-income" className="sr-only" />
                      <ArrowUpCircle className={cn(
                        "w-5 h-5",
                        selectedType === "income" ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "font-medium",
                        selectedType === "income" ? "text-primary" : "text-foreground"
                      )}>
                        Receita
                      </span>
                    </label>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedType(undefined)}
                    className={cn(
                      "w-full mt-2",
                      selectedType === undefined ? "border-orange-500 text-orange-500" : ""
                    )}
                  >
                    Limpar Tipo
                  </Button>
                </RadioGroup>
              </div>

              <DropdownMenuSeparator />

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Categoria</Label>
                <CategoryFilter 
                  emitRefetch={(categoryId: string | undefined): void => selectCategory(categoryId)} 
                  selectedCategoryId={selectedCategoryId}
                  type={selectedType}
                />
              </div>

              <DropdownMenuSeparator />

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedType(undefined);
                    selectCategory(undefined);
                  }}
                >
                  Limpar Todos
                </Button>
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
        {/* <div className="grid grid-cols-2 gap-3 mb-6"> */}
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
        {/* </div> */}

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
