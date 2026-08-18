"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import {
  getCartLineCountServerSnapshot,
  getCartLineCountSnapshot,
  patchCartState,
  setCartState,
  subscribeCart,
  useCartStore,
} from "../stores/cart.store";
import type { CartLine } from "../types/cart.types";
import {
  addCartItem,
  clearCartItems,
  getCartItemQuantity,
  getCartTotals,
  pruneCart,
  removeCartItem,
  resolveCartLines,
  updateCartItem,
} from "../utils/cart";

export function useCart() {
  const items = useCartStore();
  const { products } = useAppContext();

  useEffect(() => {
    const pruned = pruneCart(items, products);
    if (pruned.length !== items.length) {
      setCartState(pruned);
    }
  }, [items, products]);

  const lines = useMemo<CartLine[]>(
    () => resolveCartLines(items, products),
    [items, products],
  );

  const totals = useMemo(() => getCartTotals(lines), [lines]);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      patchCartState((prev) => addCartItem(prev, products, productId, quantity));
    },
    [products],
  );

  const updateCart = useCallback((productId: string, quantity: number) => {
    patchCartState((prev) => updateCartItem(prev, productId, quantity));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    patchCartState((prev) => removeCartItem(prev, productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartState(clearCartItems());
  }, []);

  const getQuantity = useCallback(
    (productId: string) => getCartItemQuantity(items, productId),
    [items],
  );

  return {
    items,
    lines,
    isEmpty: lines.length === 0,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    getQuantity,
    ...totals,
  };
}

export function useCartCount() {
  return useSyncExternalStore(
    subscribeCart,
    getCartLineCountSnapshot,
    getCartLineCountServerSnapshot,
  );
}
