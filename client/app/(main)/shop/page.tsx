import ShopView from "@/features/shop/components/shop-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GreenCart Official",
  description:
    "Shop fresh groceries from GreenCart Official — fast replies, trusted ratings, and daily essentials.",
};

export default function ShopPage() {
  return <ShopView />;
}
