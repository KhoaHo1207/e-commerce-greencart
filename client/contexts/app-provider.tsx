"use client";

import type { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type AppRouter = ReturnType<typeof useRouter>;

export type AppContextValue = {
  router: AppRouter;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isSeller: boolean;
  setIsSeller: Dispatch<SetStateAction<boolean>>;
};

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    role: "user",
  });
  const [isSeller, setIsSeller] = useState(false);

  const value = useMemo<AppContextValue>(
    () => ({
      router,
      user,
      setUser,
      isSeller,
      setIsSeller,
    }),
    [router, user, isSeller]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}
