"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { useCartItem } from "@/features/cart/hooks";
import type { Product } from "@/features/products/types/product.types";
import { assets } from "@/constants/assets";
import { toCategorySlug } from "@/lib/slug";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import WishlistButton from "./wishlist-button";

export default function WishlistItem({ product }: { product: Product }) {
  const { currency } = useAppContext();
  const { quantity, increment } = useCartItem(product._id);
  const href = `/products/${toCategorySlug(product.category)}/${product.slug}`;

  return (
    <article className="relative border border-border rounded-md bg-card text-card-foreground w-full h-full flex flex-col">
      <div className="absolute top-1 right-1 z-10">
        <WishlistButton productId={product._id} productName={product.name} />
      </div>
      <Link href={href} className="px-3 pt-3 md:px-4 md:pt-4 flex-1">
        <div className="flex items-center justify-center px-2">
          <Image
            className="max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
            width={100}
            height={100}
          />
        </div>
        <div className="text-muted-foreground text-sm mt-2">
          <p>{product.category}</p>
          <p className="text-foreground font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div
            className="flex items-center gap-0.5"
            aria-label={`Rating ${product.rating} out of 5`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Image
                key={i}
                src={
                  i < Math.round(product.rating)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt=""
                width={14}
                height={13}
              />
            ))}
            <p>({product.rating})</p>
          </div>
          <p className="md:text-xl text-base font-medium text-primary mt-3">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-muted-foreground md:text-sm text-xs line-through">
              {currency}
              {product.price}
            </span>
          </p>
        </div>
      </Link>

      <div className="text-primary px-3 pb-3 md:px-4 md:pb-4 mt-2">
        {!product.inStock ? (
          <p className="text-sm text-muted-foreground text-right">Out of stock</p>
        ) : (
          <button
            type="button"
            className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/30 h-[34px] px-3 rounded text-primary font-medium ml-auto"
            onClick={() => {
              increment();
              if (quantity === 0) toast.success("Added to cart");
            }}
          >
            <ShoppingCart className="size-4" />
            {quantity === 0 ? "Add" : `In cart (${quantity})`}
          </button>
        )}
      </div>
    </article>
  );
}
