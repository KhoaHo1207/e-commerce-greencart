"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { formatCartMoney } from "@/features/cart/utils/cart";
import type { Order } from "../types/order.types";
import {
  formatOrderAddress,
  formatOrderDate,
  formatOrderId,
  formatOrderRecipient,
} from "../utils/orders";
import OrderItemRow from "./order-item";

export default function OrderCard({ order }: { order: Order }) {
  const { currency } = useAppContext();

  return (
    <article className="border border-border rounded-lg bg-card overflow-hidden">
      <header className="flex flex-col gap-3 px-4 py-4 sm:px-5 sm:flex-row sm:items-start sm:justify-between bg-muted/40 border-b border-border">
        <div>
          <p className="font-medium text-foreground">
            Order #{formatOrderId(order._id)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {formatOrderDate(order.createdAt)} · {order.paymentType}
            {order.isPaid ? " · Paid" : " · Payment pending"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {formatOrderRecipient(order.address)} ·{" "}
            {formatOrderAddress(order.address)}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm font-medium text-primary">{order.status}</p>
          <p className="text-base font-medium text-foreground mt-1">
            {formatCartMoney(currency, order.amount)}
          </p>
        </div>
      </header>

      <div className="px-4 sm:px-5">
        {order.items.map((item) => (
          <OrderItemRow key={item._id} item={item} />
        ))}
      </div>
    </article>
  );
}
