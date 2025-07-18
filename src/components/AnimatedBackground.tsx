import discordBg from "@/assets/discord-bg.jpg";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${discordBg})` }}
      ></div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg opacity-20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-primary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-white/80 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-1200"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/60 rounded-full animate-bounce delay-1500"></div>
      <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-primary/70 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-900"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};