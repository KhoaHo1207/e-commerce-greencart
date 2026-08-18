"use client";

import { useCartCount } from "@/features/cart/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const typeCount = useCartCount();
  const label =
    typeCount === 0
      ? "Shopping cart"
      : `Shopping cart, ${typeCount} ${typeCount === 1 ? "product" : "products"}`;

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="relative inline-flex size-8 items-center justify-center"
    >
      <ShoppingCart className="size-[18px] text-foreground" aria-hidden />
      {typeCount > 0 ? (
        <span className="absolute top-0 right-0 min-w-4 h-4 px-0.5 text-[10px] leading-none text-primary-foreground bg-primary rounded-full flex items-center justify-center">
          {typeCount > 99 ? "99+" : typeCount}
        </span>
      ) : null}
    </Link>
  );
}
