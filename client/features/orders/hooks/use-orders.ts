"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { dummyOrders } from "@/constants/assets";
import { useCallback, useMemo } from "react";
import type { Order, OrderStatus } from "../types/order.types";
import {
  patchOrderPatchesState,
  useOrderPatches,
} from "../stores/orders.store";
import {
  applyOrderPatches,
  sortOrdersByNewest,
  upsertOrderPatch,
} from "../utils/orders";

export function useOrders() {
  const { user } = useAppContext();
  const patches = useOrderPatches();
  const isSignedIn = Boolean(user);

  const orders = useMemo(() => {
    if (!isSignedIn) return [];
    const merged = applyOrderPatches(dummyOrders as Order[], patches);
    return sortOrdersByNewest(merged);
  }, [isSignedIn, patches]);

  const updateStatus = useCallback((orderId: string, status: OrderStatus) => {
    patchOrderPatchesState((prev) => {
      const current = dummyOrders.find((order) => order._id === orderId);
      const existing = prev.find((patch) => patch.orderId === orderId);
      const isPaid =
        existing?.isPaid ??
        (current as Order | undefined)?.isPaid ??
        false;
      return upsertOrderPatch(prev, { orderId, status, isPaid });
    });
  }, []);

  const markPaid = useCallback((orderId: string) => {
    patchOrderPatchesState((prev) => {
      const current = dummyOrders.find((order) => order._id === orderId);
      const existing = prev.find((patch) => patch.orderId === orderId);
      const status =
        existing?.status ??
        ((current as Order | undefined)?.status as OrderStatus | undefined) ??
        "Order Placed";
      return upsertOrderPatch(prev, { orderId, status, isPaid: true });
    });
  }, []);

  return { orders, isSignedIn, updateStatus, markPaid };
}
