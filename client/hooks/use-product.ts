"use client";

import { useAppContext } from "@/contexts/app-provider";
import { Product } from "@/types/product";
import { useMemo } from "react";

export function toCategorySlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

export const useFilterProducts = (
  categorySlug?: string,
): {
  filteredProducts: Product[];
  totalProducts: number;
} => {
  const { products } = useAppContext();

  const filteredProducts = useMemo(() => {
    if (!categorySlug) return products;

    const selected = toCategorySlug(categorySlug);

    return products.filter(
      (product) => toCategorySlug(product.category) === selected,
    );
  }, [products, categorySlug]);

  return {
    filteredProducts,
    totalProducts: filteredProducts.length,
  };
};
