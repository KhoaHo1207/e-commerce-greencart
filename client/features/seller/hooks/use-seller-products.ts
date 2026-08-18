"use client";

import { useAppContext } from "@/components/providers/app-provider";
import type { Product, ProductImage } from "@/features/products/types/product.types";
import { useCallback } from "react";
import type { SellerProductSchema } from "../schemas/seller-product.schema";
import { buildSellerProduct } from "../utils/seller-products";

export function useSellerProducts() {
  const { products, setProducts, categories, currency } = useAppContext();

  const addProduct = useCallback(
    (values: SellerProductSchema, images: ProductImage[]) => {
      const next = buildSellerProduct(values, products, images);
      setProducts((prev) => [next, ...prev]);
      return next;
    },
    [products, setProducts],
  );

  const updateProduct = useCallback(
    (id: string, values: SellerProductSchema, images: ProductImage[]) => {
      const existing = products.find((product) => product._id === id);
      if (!existing) return null;
      const next = buildSellerProduct(values, products, images, existing);
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? next : product)),
      );
      return next;
    },
    [products, setProducts],
  );

  const removeProduct = useCallback(
    (id: string) => {
      setProducts((prev) => prev.filter((product) => product._id !== id));
    },
    [setProducts],
  );

  const toggleStock = useCallback(
    (id: string, inStock: boolean) => {
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id
            ? { ...product, inStock, updatedAt: new Date().toISOString() }
            : product,
        ),
      );
    },
    [setProducts],
  );

  const getProduct = useCallback(
    (id: string): Product | undefined =>
      products.find((product) => product._id === id),
    [products],
  );

  return {
    products,
    categories,
    currency,
    addProduct,
    updateProduct,
    removeProduct,
    toggleStock,
    getProduct,
  };
}
