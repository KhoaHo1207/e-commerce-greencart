import OrdersView from "@/features/orders/components/orders-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your GreenCart grocery orders and buy items again.",
};

export default function MyOrdersPage() {
  return <OrdersView />;
}
