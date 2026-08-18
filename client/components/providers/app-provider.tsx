"use client";

import type { User } from "@/features/auth/types/user.types";
import type { Category } from "@/features/categories/types/category.types";
import type { Product } from "@/features/products/types/product.types";
import { dummyCategories, dummyProducts } from "@/constants/assets";
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
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  currency: string;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
};

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter();
  const [user, setUser] = useState<User | null>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    role: "user",
  });
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [categories, setCategories] = useState<Category[]>(dummyCategories);

  const isSeller = user?.role === "seller";

  const setIsSeller: Dispatch<SetStateAction<boolean>> = (value) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next =
        typeof value === "function" ? value(prev.role === "seller") : value;
      if (next === (prev.role === "seller")) return prev;
      return { ...prev, role: next ? "seller" : "user" };
    });
  };

  const value = useMemo<AppContextValue>(
    () => ({
      router,
      user,
      setUser,
      isSeller,
      setIsSeller,
      products,
      setProducts,
      currency,
      categories,
      setCategories,
    }),
    [router, user, isSeller, products, currency, categories],
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
