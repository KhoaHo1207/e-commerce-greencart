import type { Product } from "@/features/products/types/product.types";
import { WISHLIST_MAX_ITEMS, type Wishlist } from "../schemas/wishlist.schema";

export function hasWishlistItem(ids: Wishlist, productId: string): boolean {
  return ids.includes(productId);
}

export function addWishlistItem(ids: Wishlist, productId: string): Wishlist {
  if (!productId || hasWishlistItem(ids, productId)) return ids;
  if (ids.length >= WISHLIST_MAX_ITEMS) return ids;
  return [...ids, productId];
}

export function removeWishlistItem(ids: Wishlist, productId: string): Wishlist {
  return ids.filter((id) => id !== productId);
}

export function toggleWishlistItem(ids: Wishlist, productId: string): Wishlist {
  return hasWishlistItem(ids, productId)
    ? removeWishlistItem(ids, productId)
    : addWishlistItem(ids, productId);
}

export function pruneWishlist(ids: Wishlist, products: Product[]): Wishlist {
  const productIds = new Set(products.map((product) => product._id));
  return ids.filter((id) => productIds.has(id));
}

export function resolveWishlistProducts(
  ids: Wishlist,
  products: Product[],
): Product[] {
  return ids.flatMap((id) => {
    const product = products.find((entry) => entry._id === id);
    return product ? [product] : [];
  });
}
