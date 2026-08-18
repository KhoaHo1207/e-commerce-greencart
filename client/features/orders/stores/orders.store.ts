"use client";

import { dummyOrders } from "@/constants/assets";
import { useEffect, useSyncExternalStore } from "react";
import {
  ORDER_PATCH_STORAGE_KEY,
  parseOrderPatches,
  type OrderPatches,
} from "../schemas/order-patch.schema";
import type { Order } from "../types/order.types";
import { applyOrderPatches } from "../utils/orders";

const EMPTY_PATCHES: OrderPatches = [];
const listeners = new Set<() => void>();

let patches: OrderPatches = EMPTY_PATCHES;
let didHydrate = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function persist(next: OrderPatches) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDER_PATCH_STORAGE_KEY, JSON.stringify(next));
}

export function getOrderPatchesSnapshot(): OrderPatches {
  return patches;
}

export function getOrderPatchesServerSnapshot(): OrderPatches {
  return EMPTY_PATCHES;
}

export function subscribeOrderPatches(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setOrderPatchesState(next: unknown) {
  const parsed = parseOrderPatches(next);
  if (!parsed) return;

  const nextPatches = parsed.length === 0 ? EMPTY_PATCHES : parsed;
  if (JSON.stringify(nextPatches) === JSON.stringify(patches)) return;

  patches = nextPatches;
  persist(patches);
  emit();
}

export function patchOrderPatchesState(
  updater: (prev: OrderPatches) => unknown,
) {
  setOrderPatchesState(updater(patches));
}

export function hydrateOrderPatches() {
  if (didHydrate || typeof window === "undefined") return;
  didHydrate = true;

  try {
    const raw = localStorage.getItem(ORDER_PATCH_STORAGE_KEY);
    if (!raw) return;

    const parsed = parseOrderPatches(JSON.parse(raw));
    if (!parsed) {
      localStorage.removeItem(ORDER_PATCH_STORAGE_KEY);
      return;
    }

    patches = parsed.length === 0 ? EMPTY_PATCHES : parsed;
    emit();
  } catch {
    localStorage.removeItem(ORDER_PATCH_STORAGE_KEY);
  }
}

export function getPatchedOrders(): Order[] {
  return applyOrderPatches(dummyOrders as Order[], patches);
}

export function useOrderPatches() {
  useEffect(() => {
    hydrateOrderPatches();
  }, []);

  return useSyncExternalStore(
    subscribeOrderPatches,
    getOrderPatchesSnapshot,
    getOrderPatchesServerSnapshot,
  );
}
