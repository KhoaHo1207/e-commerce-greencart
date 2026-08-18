import { toCategorySlug } from "@/lib/slug";
import type { Product } from "../types/product.types";

export const RELATED_PRODUCTS_LIMIT = 5;

export function getRelatedProducts(
  products: Product[],
  currentProductId: string,
  category: string,
  limit = RELATED_PRODUCTS_LIMIT,
): Product[] {
  const categorySlug = toCategorySlug(category);

  return products
    .filter(
      (product) =>
        product._id !== currentProductId &&
        toCategorySlug(product.category) === categorySlug,
    )
    .slice(0, limit);
}
