import CartView from "@/features/cart/components/cart-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the groceries in your GreenCart shopping cart.",
};

export default function CartPage() {
  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">Shopping Cart</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
