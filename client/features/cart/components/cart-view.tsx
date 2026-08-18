"use client";

import { useCart } from "@/features/cart/hooks";
import CartEmpty from "./cart-empty";
import CartItemRow from "./cart-item-row";
import CartSummary from "./cart-summary";

export default function CartView() {
  const { lines, isEmpty, itemCount, uniqueCount, subtotal, tax, total } =
    useCart();

  if (isEmpty) {
    return <CartEmpty />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12">
      <section aria-label="Cart items">
        {lines.map((line) => (
          <CartItemRow key={line.productId} line={line} />
        ))}
      </section>
      <CartSummary
        totals={{ itemCount, uniqueCount, subtotal, tax, total }}
      />
    </div>
  );
}
