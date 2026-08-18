import type { Order, OrderAddress, OrderStatus } from "../types/order.types";
import { ORDER_STATUSES } from "../types/order.types";
import type { OrderPatch, OrderPatches } from "../schemas/order-patch.schema";

export function sortOrdersByNewest(orders: Order[]): Order[] {
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatOrderId(id: string): string {
  return id.slice(-8).toUpperCase();
}

export function formatOrderAddress(address: OrderAddress): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zipcode}, ${address.country}`;
}

export function formatOrderRecipient(address: OrderAddress): string {
  return `${address.firstName} ${address.lastName}`;
}

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

export function applyOrderPatches(
  orders: Order[],
  patches: OrderPatches,
): Order[] {
  if (patches.length === 0) return orders;
  const byId = new Map(patches.map((patch) => [patch.orderId, patch]));
  return orders.map((order) => {
    const patch = byId.get(order._id);
    if (!patch) return order;
    return { ...order, status: patch.status, isPaid: patch.isPaid };
  });
}

export function upsertOrderPatch(
  patches: OrderPatches,
  patch: OrderPatch,
): OrderPatches {
  const index = patches.findIndex((item) => item.orderId === patch.orderId);
  if (index === -1) return [...patches, patch];
  return patches.map((item, i) => (i === index ? patch : item));
}

export function filterOrders(
  orders: Order[],
  query: string,
  status: OrderStatus | "all",
): Order[] {
  const normalized = query.trim().toLowerCase();
  return orders.filter((order) => {
    if (status !== "all" && order.status !== status) return false;
    if (!normalized) return true;
    const haystack = [
      formatOrderId(order._id),
      order._id,
      formatOrderRecipient(order.address),
      ...order.items.map((item) => item.product.name),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
