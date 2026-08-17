"use client";

import { assets } from "@/constants/assets";
import { useAppContext } from "@/contexts/app-provider";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function ProductCard({ product }: { product: Product }) {
  const [count, setCount] = useState(0);
  const { currency } = useAppContext();

  return (
    <div className="border border-border rounded-md md:px-4 px-3 py-2 bg-card text-card-foreground min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <Image
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.image[0]}
          alt={product.name}
          width={100}
          height={100}
        />
      </div>
      <div className="text-muted-foreground text-sm">
        <p>{product.category}</p>
        <p className="text-foreground font-medium text-lg truncate w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <Image
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                width={14}
                height={13}
              />
            ))}
          <p>({product.rating})</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-muted-foreground md:text-sm text-xs line-through">
              {currency}
              {product.price}
            </span>
          </p>
          <div className="text-primary">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/30 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium"
                onClick={() => setCount(1)}
              >
                <ShoppingCart className="size-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-secondary rounded select-none">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
