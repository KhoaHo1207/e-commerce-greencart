import SellerOrders from "@/features/seller/components/seller-orders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default function SellerOrdersPage() {
  return <SellerOrders />;
}
