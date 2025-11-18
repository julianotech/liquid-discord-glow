import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { User, Lock, Bell, Database, Shield, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      <main className="relative z-10 p-4 pt-6 pb-24">
        <h1 className="text-2xl font-bold text-foreground mb-6">Configurações</h1>

        {/* My Account Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Minha Conta</h2>
          <div className="space-y-3">
            <Card className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Editar Perfil</p>
                  <p className="text-sm text-muted-foreground">Editar informações do perfil</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Mudar Senha</p>
                  <p className="text-sm text-muted-foreground">Altere sua senha para maior segurança</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Notificações</h2>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Notificações</p>
                <p className="text-sm text-muted-foreground">Receba alertas sobre suas finanças</p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Privacy & Security Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Privacidade e Segurança</h2>
          <div className="space-y-3">
            <Card className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Gerenciar Dados</p>
                  <p className="text-sm text-muted-foreground">Gerencie seus dados pessoais</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Autenticação</p>
                  <p className="text-sm text-muted-foreground">Configure a autenticação de dois fatores</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Aparência</h2>
          <Card className="glass-card p-4">
            <p className="text-muted-foreground text-sm text-center">Opções de tema em breve</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
