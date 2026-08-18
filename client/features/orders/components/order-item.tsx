"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/components/providers/app-provider";
import { useCart } from "@/features/cart/hooks";
import { formatCartMoney } from "@/features/cart/utils/cart";
import ProductPhoto from "@/features/products/components/product-photo";
import { toCategorySlug } from "@/lib/slug";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { OrderItem } from "../types/order.types";

export default function OrderItemRow({ item }: { item: OrderItem }) {
  const { currency } = useAppContext();
  const { addToCart } = useCart();
  const router = useRouter();
  const { product, quantity } = item;
  const href = `/products/${toCategorySlug(product.category)}/${product.slug}`;
  const inStock = product.inStock;

  function handleAddToCart() {
    addToCart(product._id, quantity);
    toast.success("Added to cart");
  }

  function handleBuyNow() {
    addToCart(product._id, quantity);
    router.push("/cart");
  }

  return (
    <article className="flex flex-col gap-3 py-4 border-b border-border last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 min-w-0">
        <Link href={href} className="shrink-0">
          <ProductPhoto
            src={product.image[0]}
            alt={product.name}
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
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground mt-0.5">
            {product.category} · Qty: {quantity} ·{" "}
            {formatCartMoney(currency, product.offerPrice)} each
          </p>
          {!inStock ? (
            <p className="text-sm text-muted-foreground mt-1">Out of stock</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:shrink-0">
        <Button
          type="button"
          variant="secondary"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button type="button" disabled={!inStock} onClick={handleBuyNow}>
          Buy now
        </Button>
      </div>
    </article>
  );
}
