import { TransactionItem } from "@/components/TransactionItem";
import { Input } from "@/components/ui/input";
import { useTransactions } from "@/hooks/api/use-transactions-api";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const History = (): JSX.Element => {
  // const [startDate, setStartDate] = useState<Date>();
  // const [endDate, setEndDate] = useState<Date>();
  const [limit, setLimit] = useState<number>(1)
  // const { data: transactions = [], hasMore } = useTransactions({ limit });
  const { data, isLoading } = useTransactions({ limit });
  const transactions = data?.data || [];
  const hasMore = data?.hasMore; // Agora 'hasMore' é acessível
  // const total = data?.total;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative z-10 p-4 pt-6 pb-24">
        {/* Search Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Pesquisar"
              className="bg-input border border-input focus:ring-ring focus:ring-1 pl-10"
            />
          </div>
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
