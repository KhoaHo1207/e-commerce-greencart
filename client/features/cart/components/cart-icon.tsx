"use client";

import { useCartCount } from "@/features/cart/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const itemCount = useCartCount();
  const label =
    itemCount === 0
      ? "Shopping cart"
      : `Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  return (
    <Link href="/cart" aria-label={label} className="relative">
      <ShoppingCart className="size-[18px] text-foreground" aria-hidden />
      {itemCount > 0 ? (
        <span className="absolute -top-2 -right-3 text-xs text-primary-foreground bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
