"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  plan: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const storageKey = "trendforge-auth-user";
const authCookieName = "trendforge-auth";

function setAuthCookie(user: User | null) {
  if (typeof document === "undefined") return;

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString();

  if (user) {
    document.cookie = `${authCookieName}=${encodeURIComponent(JSON.stringify(user))}; path=/; expires=${expires}`;
    return;
  }

  document.cookie = `${authCookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function readStoredUser() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = readStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setAuthCookie(storedUser);
    } else {
      setAuthCookie(null);
    }

    setIsLoading(false);
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error("Completa todos los campos para crear tu cuenta.");
    }

    const nextUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      plan: "Free",
    };

    window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
    setAuthCookie(nextUser);
    setUser(nextUser);
    router.push("/dashboard");
  };

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Introduce tu correo y tu contraseña.");
    }

    const storedUser = readStoredUser();
    if (!storedUser || storedUser.email !== email) {
      throw new Error("No existe una cuenta con ese correo.");
    }

    setAuthCookie(storedUser);
    setUser(storedUser);
    router.push("/dashboard");
  };

  const signOut = () => {
    window.localStorage.removeItem(storageKey);
    setAuthCookie(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
