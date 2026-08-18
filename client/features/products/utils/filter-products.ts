import { toCategorySlug } from "@/lib/slug";
import type { Product } from "../types/product.types";

export function parseSearchQuery(
  value: string | string[] | undefined,
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

export function filterProducts(
  products: Product[],
  {
    categorySlug,
    query,
  }: {
    categorySlug?: string;
    query?: string;
  } = {},
): Product[] {
  const selected = categorySlug ? toCategorySlug(categorySlug) : undefined;
  const q = query?.trim().toLowerCase();

  return products.filter((product) => {
    if (selected && toCategorySlug(product.category) !== selected) {
      return false;
    }
    if (!q) return true;
    return productMatchesQuery(product, q);
  });
}

export function productMatchesQuery(product: Product, query: string): boolean {
  if (product.name.toLowerCase().includes(query)) return true;
  if (product.category.toLowerCase().includes(query)) return true;
  if (product.slug.replaceAll("-", " ").includes(query)) return true;
  return false;
}
