import type { Order, OrderAddress } from "../types/order.types";

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
