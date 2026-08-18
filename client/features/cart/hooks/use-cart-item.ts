"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { useCallback } from "react";
import { patchCartState, useCartStore } from "../stores/cart.store";
import {
  addCartItem,
  getCartItemQuantity,
  removeCartItem,
  updateCartItem,
} from "../utils/cart";

export function useCartItem(productId: string) {
  const items = useCartStore();
  const { products } = useAppContext();
  const quantity = getCartItemQuantity(items, productId);

  const add = useCallback(
    (amount = 1) => {
      patchCartState((prev) => addCartItem(prev, products, productId, amount));
    },
    [productId, products],
  );

  const increment = useCallback(() => {
    patchCartState((prev) => {
      const current = getCartItemQuantity(prev, productId);
      if (current <= 0) {
        return addCartItem(prev, products, productId, 1);
      }

      return updateCartItem(prev, productId, current + 1);
    });
  }, [productId, products]);

  const decrement = useCallback(() => {
    patchCartState((prev) => {
      const current = getCartItemQuantity(prev, productId);
      if (current <= 1) {
        return removeCartItem(prev, productId);
      }

      return updateCartItem(prev, productId, current - 1);
    });
  }, [productId]);

  const setQuantity = useCallback((nextQuantity: number) => {
    patchCartState((prev) => updateCartItem(prev, productId, nextQuantity));
  }, [productId]);

  const remove = useCallback(() => {
    patchCartState((prev) => removeCartItem(prev, productId));
  }, [productId]);

  return {
    quantity,
    increment,
    decrement,
    setQuantity,
    remove,
    addToCart: add,
  };
}
