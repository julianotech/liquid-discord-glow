// import { LoginForm } from "@/components/LoginForm";

// const Index = (): JSX.Element => {
//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       {/* <AnimatedBackground /> */}

//       <main className="flex items-center justify-center min-h-screen p-4 relative z-10">
//         <div className="w-full max-w-lg">
//           <LoginForm />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Index;
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isProduction } from "@/utils";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialState = isProduction ? { email: "", password: "" } : {
  email: "admin@portal.com",
  password: "admin123",
}


export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);

      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao painel administrativo",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Credenciais inválidas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title Section */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground">Entre com suas credenciais para acessar</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground h-11"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground h-11"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white text-base font-semibold h-12"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
              onClick={(): void => {
                toast({
                  title: "Recuperação de senha",
                  description: "Entre em contato com o administrador do sistema",
                });
              }}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-xs text-center text-muted-foreground px-4">
          Área restrita. Apenas usuários autorizados podem acessar.
        </p>
      </div>
    </div>
  );
}
