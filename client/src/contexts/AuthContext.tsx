import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CurrentUser, AuthContextValue } from "../types";

const AuthContext = createContext<AuthContextValue>({
    currentUser: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function login(token: string, user: CurrentUser) {
    
   localStorage.setItem("auth-token", token); // guarda el token en localStorage ("auth-token"),
    setCurrentUser(user); // actualiza currentUser y pon isAuthenticated en true
    setIsAuthenticated(true);
  }
  function logout() {
    localStorage.removeItem("auth-token"); // elimina "auth-token" de localStorage,
    setCurrentUser(null); // limpia currentUser
    setIsAuthenticated(false); // pon isAuthenticated en false
  }
  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
};