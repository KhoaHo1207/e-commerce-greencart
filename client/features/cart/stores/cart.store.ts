"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CART_STORAGE_KEY, parseCart, type Cart } from "../schemas/cart.schema";
import { getCartLineCount } from "../utils/cart";

const EMPTY_CART: Cart = [];
const listeners = new Set<() => void>();

let items: Cart = EMPTY_CART;
let didHydrate = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function persist(cart: Cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function getCartSnapshot(): Cart {
  return items;
}

export function getCartServerSnapshot(): Cart {
  return EMPTY_CART;
}

export function getCartLineCountSnapshot(): number {
  return getCartLineCount(items);
}

export function getCartLineCountServerSnapshot(): number {
  return 0;
}

export function subscribeCart(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setCartState(next: unknown) {
  const parsed = parseCart(next);
  if (!parsed) return;

  const nextItems = parsed.length === 0 ? EMPTY_CART : parsed;
  if (JSON.stringify(nextItems) === JSON.stringify(items)) return;

  items = nextItems;
  persist(items);
  emit();
}

export function patchCartState(updater: (prev: Cart) => unknown) {
  setCartState(updater(items));
}

export function hydrateCart() {
  if (didHydrate || typeof window === "undefined") return;
  didHydrate = true;

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;

    const parsed = parseCart(JSON.parse(raw));
    if (!parsed) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    items = parsed.length === 0 ? EMPTY_CART : parsed;
    emit();
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}

export function useCartStore() {
  useEffect(() => {
    hydrateCart();
  }, []);

  return useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );
}
