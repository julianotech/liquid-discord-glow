import { ReactNode } from "react";

import { useLogin, useLogout, useMe } from "@/hooks/api/use-auth-api";
import { AuthContext } from "@/hooks/useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useMe();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const login = async (email: string, password: string): Promise<void> => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
