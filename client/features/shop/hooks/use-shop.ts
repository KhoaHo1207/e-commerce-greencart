"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { dummyShop } from "@/constants/assets";
import { useMemo } from "react";
import type { Shop } from "../types/shop.types";

export function useShop(): Shop {
  const { products } = useAppContext();

  return useMemo(
    () => ({
      ...dummyShop,
      productCount: products.length,
    }),
    [products.length],
  );
}
