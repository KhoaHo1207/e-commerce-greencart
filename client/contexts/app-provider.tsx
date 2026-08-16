"use client";

import { dummyProducts } from "@/constants/assets";
import type { CartItem } from "@/features/cart/types";
import {
  addCartItem,
  removeCartItem,
  updateCartItem,
} from "@/features/cart/utils";
import type { Product } from "@/types/product";
import type { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
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
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (productId: string, quantity?: number) => void;
  updateCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
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
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      setCartItems((prev) => addCartItem(prev, products, productId, quantity));
    },
    [products]
  );

  const updateCart = useCallback((productId: string, quantity: number) => {
    setCartItems((prev) => updateCartItem(prev, productId, quantity));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => removeCartItem(prev, productId));
  }, []);

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
      cartItems,
      setCartItems,
      addToCart,
      updateCart,
      removeFromCart,
    }),
    [
      router,
      user,
      isSeller,
      products,
      currency,
      cartItems,
      addToCart,
      updateCart,
      removeFromCart,
    ]
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
