"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { useCallback, useEffect, useMemo } from "react";
import {
  patchWishlistState,
  setWishlistState,
  useWishlistStore,
} from "../stores/wishlist.store";
import {
  addWishlistItem,
  hasWishlistItem,
  pruneWishlist,
  removeWishlistItem,
  resolveWishlistProducts,
  toggleWishlistItem,
} from "../utils/wishlist";

export function useWishlist() {
  const ids = useWishlistStore();
  const { products } = useAppContext();

  useEffect(() => {
    const pruned = pruneWishlist(ids, products);
    if (pruned.length !== ids.length) {
      setWishlistState(pruned);
    }
  }, [ids, products]);

  const items = useMemo(
    () => resolveWishlistProducts(ids, products),
    [ids, products],
  );

  const add = useCallback((productId: string) => {
    patchWishlistState((prev) => addWishlistItem(prev, productId));
  }, []);

  const remove = useCallback((productId: string) => {
    patchWishlistState((prev) => removeWishlistItem(prev, productId));
  }, []);

  const toggle = useCallback((productId: string) => {
    patchWishlistState((prev) => toggleWishlistItem(prev, productId));
  }, []);

  const has = useCallback(
    (productId: string) => hasWishlistItem(ids, productId),
    [ids],
  );

  return {
    ids,
    items,
    isEmpty: items.length === 0,
    add,
    remove,
    toggle,
    has,
  };
}

export function useWishlistItem(productId: string) {
  const ids = useWishlistStore();
  const isSaved = hasWishlistItem(ids, productId);

  const toggle = useCallback(() => {
    patchWishlistState((prev) => toggleWishlistItem(prev, productId));
  }, [productId]);

  const add = useCallback(() => {
    patchWishlistState((prev) => addWishlistItem(prev, productId));
  }, [productId]);

  const remove = useCallback(() => {
    patchWishlistState((prev) => removeWishlistItem(prev, productId));
  }, [productId]);

  return { isSaved, toggle, add, remove };
}
