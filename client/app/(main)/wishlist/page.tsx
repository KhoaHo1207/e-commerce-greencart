import WishlistView from "@/features/wishlist/components/wishlist-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save groceries you want to buy later on GreenCart.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
