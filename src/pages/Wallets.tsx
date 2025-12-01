import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCreateWallet, useJoinWallet, useWallets } from "@/hooks/api/use-wallets-api";
import { Copy, Plus, UserPlus, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wallets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: wallets, isLoading } = useWallets();
  const createWalletMutation = useCreateWallet();
  const joinWalletMutation = useJoinWallet();

  const [newWalletName, setNewWalletName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleCreateWallet = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!newWalletName.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, digite um nome para a carteira.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newWallet = await createWalletMutation.mutateAsync({ name: newWalletName });
      
      // Atualizar wallets no localStorage
      const currentWallets = JSON.parse(localStorage.getItem("userWallets") || "[]");
      localStorage.setItem("userWallets", JSON.stringify([...currentWallets, newWallet]));
      
      toast({
        title: "Carteira criada!",
        description: `Carteira "${newWallet.name}" criada com sucesso.`,
      });
      
      setNewWalletName("");
      
      // Selecionar a nova carteira e navegar para dashboard
      localStorage.setItem("selectedWalletId", newWallet.id);
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao criar carteira",
        description: error instanceof Error ? error.message : "Erro ao processar requisição",
        variant: "destructive",
      });
    }
  };

  const handleJoinWallet = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!joinCode.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, digite o código da carteira.",
        variant: "destructive",
      });
      return;
    }

    try {
      const wallet = await joinWalletMutation.mutateAsync({ code: joinCode });
      
      // Atualizar wallets no localStorage
      const currentWallets = JSON.parse(localStorage.getItem("userWallets") || "[]");
      localStorage.setItem("userWallets", JSON.stringify([...currentWallets, wallet]));
      
      toast({
        title: "Entrou na carteira!",
        description: `Você agora tem acesso à carteira "${wallet.name}".`,
      });
      
      setJoinCode("");
      
      // Selecionar a carteira e navegar para dashboard
      localStorage.setItem("selectedWalletId", wallet.id);
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao entrar na carteira",
        description: error instanceof Error ? error.message : "Código inválido",
        variant: "destructive",
      });
    }
  };

  const handleSelectWallet = (walletId: string): void => {
    localStorage.setItem("selectedWalletId", walletId);
    navigate("/");
  };

  const handleCopyCode = (code: string): void => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado!",
      description: "O código da carteira foi copiado para a área de transferência.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando carteiras...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Suas Carteiras</h1>
          <p className="text-muted-foreground">
            Gerencie suas carteiras financeiras
          </p>
        </div>

        {/* Existing Wallets */}
        {wallets && wallets.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Minhas Carteiras</h2>
            <div className="grid gap-4">
              {wallets.map((wallet) => (
                <Card key={wallet.id} className="cursor-pointer hover:border-primary transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <WalletIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{wallet.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            Código: {wallet.code}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyCode(wallet.code);
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </CardDescription>
                        </div>
                      </div>
                      <Button onClick={() => handleSelectWallet(wallet.id)}>
                        Acessar
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Create or Join Wallet */}
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">
              <Plus className="w-4 h-4 mr-2" />
              Criar Carteira
            </TabsTrigger>
            <TabsTrigger value="join">
              <UserPlus className="w-4 h-4 mr-2" />
              Entrar em Carteira
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Criar Nova Carteira</CardTitle>
                <CardDescription>
                  Crie uma nova carteira para gerenciar suas finanças
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateWallet} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="walletName">Nome da Carteira</Label>
                    <Input
                      id="walletName"
                      placeholder="Ex: Carteira Pessoal"
                      value={newWalletName}
                      onChange={(e) => setNewWalletName(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={createWalletMutation.isPending}
                  >
                    {createWalletMutation.isPending ? "Criando..." : "Criar Carteira"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="join">
            <Card>
              <CardHeader>
                <CardTitle>Entrar em uma Carteira</CardTitle>
                <CardDescription>
                  Digite o código da carteira para ter acesso compartilhado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoinWallet} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="joinCode">Código da Carteira</Label>
                    <Input
                      id="joinCode"
                      placeholder="Digite o código"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={joinWalletMutation.isPending}
                  >
                    {joinWalletMutation.isPending ? "Entrando..." : "Entrar na Carteira"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallets;
