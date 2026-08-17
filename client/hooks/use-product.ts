"use client";

import { useAppContext } from "@/contexts/app-provider";
import { Product } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function toCategorySlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

export const useFilterProducts = (): {
  filteredProducts: Product[];
  totalProducts: number;
  category: string;
} => {
  const { products } = useAppContext();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const filteredProducts = useMemo(() => {
    if (!category) return products;

    const selected = toCategorySlug(category);

    return products.filter(
      (product) => toCategorySlug(product.category) === selected,
    );
  }, [products, category]);

  return {
    filteredProducts,
    totalProducts: filteredProducts.length,
    category,
  };
};
