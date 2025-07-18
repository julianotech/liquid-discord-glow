import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlassHeader } from "@/components/GlassHeader";
import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <GlassHeader />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 relative z-10">
        <div className="w-full max-w-lg">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
