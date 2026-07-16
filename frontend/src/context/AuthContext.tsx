import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi, type UserProfile } from "@/lib/api";
import { recordTodayVisit } from "@/lib/activityLog";

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  setSession: (token: string, user: UserProfile) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("techtrek-token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    authApi
      .profile()
      .then((res) => {
        setUser(res.data);
        recordTodayVisit();
      })
      .catch(() => {
        window.localStorage.removeItem("techtrek-token");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const setSession = (token: string, nextUser: UserProfile) => {
    window.localStorage.setItem("techtrek-token", token);
    setUser(nextUser);
    recordTodayVisit();
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // best-effort server-side invalidation
    }
    window.localStorage.removeItem("techtrek-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
