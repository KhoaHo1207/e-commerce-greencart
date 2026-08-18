"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/components/providers/app-provider";
import { formatCartMoney } from "@/features/cart/utils/cart";
import { useOrders } from "@/features/orders/hooks/use-orders";
import ProductPhoto from "@/features/products/components/product-photo";
import {
  ORDER_STATUSES,
  type OrderStatus,
} from "@/features/orders/types/order.types";
import {
  filterOrders,
  formatOrderAddress,
  formatOrderDate,
  formatOrderId,
  formatOrderRecipient,
} from "@/features/orders/utils/orders";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import SellerPageHeader from "./seller-page-header";

function statusVariant(
  status: OrderStatus,
): "default" | "secondary" | "outline" | "destructive" {
  if (status === "Delivered") return "secondary";
  if (status === "Cancelled") return "destructive";
  if (status === "Shipped") return "default";
  return "outline";
}

export default function SellerOrders() {
  const { orders, updateStatus, markPaid } = useOrders();
  const { currency } = useAppContext();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");

  const filtered = useMemo(
    () => filterOrders(orders, query, status),
    [orders, query, status],
  );

  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Orders"
        description={`${filtered.length} of ${orders.length} orders`}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by order ID, customer, or product"
          className="h-11 sm:max-w-sm"
          type="search"
        />
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as OrderStatus | "all")}
        >
          <SelectTrigger className="w-full sm:w-48 h-11">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ORDER_STATUSES.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-dashed border-border rounded-lg p-8 text-center">
          No orders match these filters.
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((order) => (
            <li
              key={order._id}
              className="border border-border rounded-lg bg-card overflow-hidden"
            >
              <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 sm:flex-row sm:items-start sm:justify-between bg-muted/40 border-b border-border">
                <div>
                  <p className="font-medium">
                    Order #{formatOrderId(order._id)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatOrderDate(order.createdAt)} · {order.paymentType}
                    {order.isPaid ? " · Paid" : " · Unpaid"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatOrderRecipient(order.address)} ·{" "}
                    {formatOrderAddress(order.address)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <p className="text-base font-medium">
                    {formatCartMoney(currency, order.amount)}
                  </p>
                  <Select
                    value={order.status}
                    onValueChange={(value) => {
                      updateStatus(order._id, value as OrderStatus);
                      toast.success(`Order #${formatOrderId(order._id)} updated`);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-44 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge variant={statusVariant(order.status)}>
                    {order.status}
                  </Badge>
                  {order.paymentType === "COD" && !order.isPaid ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        markPaid(order._id);
                        toast.success(
                          `Order #${formatOrderId(order._id)} marked as paid`,
                        );
                      }}
                    >
                      Mark as paid
                    </Button>
                  ) : null}
                </div>
              </div>

              <ul className="divide-y divide-border">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-3 px-4 sm:px-5 py-3"
                  >
                    <ProductPhoto
                      src={item.product.image[0]}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      className="size-12 object-contain rounded border border-border bg-background"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty {item.quantity} ·{" "}
                        {formatCartMoney(currency, item.product.offerPrice)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
