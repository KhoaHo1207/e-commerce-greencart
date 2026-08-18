"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/components/providers/app-provider";
import { useCartItem } from "@/features/cart/hooks";
import { toCategorySlug } from "@/lib/slug";
import ProductPhoto from "@/features/products/components/product-photo";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import type { CartLine } from "../types/cart.types";
import { formatCartMoney } from "../utils/cart";

export default function CartItemRow({ line }: { line: CartLine }) {
  const { currency } = useAppContext();
  const { quantity, increment, decrement, remove } = useCartItem(line.productId);
  const href = `/products/${toCategorySlug(line.product.category)}/${line.product.slug}`;

  return (
    <article className="grid grid-cols-[auto_1fr_auto] gap-4 items-center py-4 border-b border-border last:border-b-0">
      <Link href={href} className="shrink-0">
        <ProductPhoto
          src={line.product.image[0]}
          alt={line.product.name}
          width={72}
          height={72}
          className="size-16 md:size-[72px] object-contain rounded border border-border bg-card"
        />
      </Link>

      <div className="min-w-0">
        <Link
          href={href}
          className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
        >
          {line.product.name}
        </Link>
        <p className="text-sm text-muted-foreground mt-0.5">
          {formatCartMoney(currency, line.product.offerPrice)} each
        </p>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center h-8 rounded bg-secondary select-none">
            <button
              type="button"
              onClick={decrement}
              className="cursor-pointer px-2 h-full"
              aria-label={`Decrease ${line.product.name} quantity`}
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              className="cursor-pointer px-2 h-full"
              aria-label={`Increase ${line.product.name} quantity`}
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={remove}
            aria-label={`Remove ${line.product.name} from cart`}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      </div>

      <p className="font-medium text-primary text-right">
        {formatCartMoney(currency, line.lineTotal)}
      </p>
    </article>
  );
}
