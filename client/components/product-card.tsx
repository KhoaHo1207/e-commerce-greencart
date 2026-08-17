"use client";

import { assets } from "@/constants/assets";
import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug } from "@/lib/slug";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [count, setCount] = useState(0);
  const { currency } = useAppContext();
  const href = `/products/${toCategorySlug(product.category)}/${product.slug}`;

  return (
    <article className="border border-border rounded-md bg-card text-card-foreground w-full h-full flex flex-col">
      <Link href={href} className="px-3 pt-3 md:px-4 md:pt-4 flex-1">
        <div className="group flex items-center justify-center px-2">
          <Image
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
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
          <div className="flex items-center gap-0.5" aria-label={`Rating ${product.rating} out of 5`}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Image
                  key={i}
                  src={i < Math.round(product.rating) ? assets.star_icon : assets.star_dull_icon}
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
        {count === 0 ? (
          <button
            type="button"
            className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/30 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium ml-auto"
            onClick={() => setCount(1)}
          >
            <ShoppingCart className="size-4" />
            Add
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-secondary rounded select-none ml-auto">
            <button
              type="button"
              onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
              className="cursor-pointer text-md px-2 h-full"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-5 text-center">{count}</span>
            <button
              type="button"
              onClick={() => setCount((prev) => prev + 1)}
              className="cursor-pointer text-md px-2 h-full"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
