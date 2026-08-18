"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { useMemo } from "react";
import type { Product } from "../types/product.types";
import { filterProducts } from "../utils/filter-products";
import {
  getRelatedProducts,
  RELATED_PRODUCTS_LIMIT,
} from "../utils/related-products";

export const useFilterProducts = (
  categorySlug?: string,
  query?: string,
): {
  filteredProducts: Product[];
  totalProducts: number;
} => {
  const { products } = useAppContext();

  const filteredProducts = useMemo(
    () => filterProducts(products, { categorySlug, query }),
    [products, categorySlug, query],
  );

  return {
    filteredProducts,
    totalProducts: filteredProducts.length,
  };
};

export const useProduct = (slug: string): Product | undefined => {
  const { products } = useAppContext();

  const product = useMemo(() => {
    return products.find((item) => item.slug === slug);
  }, [products, slug]);

  return product;
};

export const useRelatedProducts = (
  productId: string,
  category: string,
  limit = RELATED_PRODUCTS_LIMIT,
): Product[] => {
  const { products } = useAppContext();

  return useMemo(
    () => getRelatedProducts(products, productId, category, limit),
    [products, productId, category, limit],
  );
};
