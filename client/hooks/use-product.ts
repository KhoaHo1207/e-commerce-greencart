"use client";

import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug } from "@/lib/slug";
import { Product } from "@/types/product";
import { useMemo } from "react";

export const useFilterProducts = (
  categorySlug?: string
): {
  filteredProducts: Product[];
  totalProducts: number;
} => {
  const { products } = useAppContext();

  const filteredProducts = useMemo(() => {
    if (!categorySlug) return products;

    const selected = toCategorySlug(categorySlug);

    return products.filter(
      (product) => toCategorySlug(product.category) === selected
    );
  }, [products, categorySlug]);

  return {
    filteredProducts,
    totalProducts: filteredProducts.length,
  };
};

export const useProduct = (slug: string): Product | undefined => {
  const { products } = useAppContext();

  const product = useMemo(() => {
    return products.find((product) => product.slug === slug);
  }, [products, slug]);

  return product;
};
