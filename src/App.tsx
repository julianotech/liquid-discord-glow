import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { AuthProvider } from "./contexts/AuthContext";
import Add from "./pages/Add";
import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Wallets from "./pages/Wallets";

const queryClient = new QueryClient();

const Layout = () => {

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow h-[calc(100vh-80px)] overflow-y-auto">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/new" element={<CreateCategory />} />
              <Route path="/categories/:id/edit" element={<EditCategory />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/add" element={<Add />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
