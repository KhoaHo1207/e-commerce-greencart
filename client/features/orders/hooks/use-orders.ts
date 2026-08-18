"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { dummyOrders } from "@/constants/assets";
import { useMemo } from "react";
import type { Order } from "../types/order.types";
import { sortOrdersByNewest } from "../utils/orders";

export function useOrders() {
  const { user } = useAppContext();
  const isSignedIn = Boolean(user);

  const orders = useMemo(() => {
    if (!isSignedIn) return [];
    return sortOrdersByNewest(dummyOrders as Order[]);
  }, [isSignedIn]);

  return { orders, isSignedIn };
}
