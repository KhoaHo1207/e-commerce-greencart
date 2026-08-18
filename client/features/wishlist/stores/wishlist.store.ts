"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  WISHLIST_STORAGE_KEY,
  parseWishlist,
  type Wishlist,
} from "../schemas/wishlist.schema";

const EMPTY_WISHLIST: Wishlist = [];
const listeners = new Set<() => void>();

let items: Wishlist = EMPTY_WISHLIST;
let didHydrate = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function persist(wishlist: Wishlist) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

export function getWishlistSnapshot(): Wishlist {
  return items;
}

export function getWishlistServerSnapshot(): Wishlist {
  return EMPTY_WISHLIST;
}

export function subscribeWishlist(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setWishlistState(next: unknown) {
  const parsed = parseWishlist(next);
  if (!parsed) return;

  const nextItems = parsed.length === 0 ? EMPTY_WISHLIST : parsed;
  if (JSON.stringify(nextItems) === JSON.stringify(items)) return;

  items = nextItems;
  persist(items);
  emit();
}

export function patchWishlistState(updater: (prev: Wishlist) => unknown) {
  setWishlistState(updater(items));
}

export function hydrateWishlist() {
  if (didHydrate || typeof window === "undefined") return;
  didHydrate = true;

  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return;

    const parsed = parseWishlist(JSON.parse(raw));
    if (!parsed) {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      return;
    }

    items = parsed.length === 0 ? EMPTY_WISHLIST : parsed;
    emit();
  } catch {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  }
}

export function useWishlistStore() {
  useEffect(() => {
    hydrateWishlist();
  }, []);

  return useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getWishlistServerSnapshot,
  );
}
