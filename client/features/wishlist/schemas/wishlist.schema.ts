import { z } from "zod";

export const WISHLIST_STORAGE_KEY = "greencart.wishlist";
export const WISHLIST_MAX_ITEMS = 100;

export const wishlistSchema = z
  .array(z.string().min(1, { error: "Product is required" }))
  .max(WISHLIST_MAX_ITEMS, {
    error: `Wishlist cannot exceed ${WISHLIST_MAX_ITEMS} products`,
  });

export type Wishlist = z.infer<typeof wishlistSchema>;

export function parseWishlist(value: unknown): Wishlist | null {
  const result = wishlistSchema.safeParse(value);
  return result.success ? result.data : null;
}
