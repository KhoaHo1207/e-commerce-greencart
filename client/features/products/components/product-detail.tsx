"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { assets } from "@/constants/assets";
import { useCart } from "@/features/cart/hooks";
import { useProduct } from "@/features/products/hooks/use-product";
import { toCategorySlug } from "@/lib/slug";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function ProductDetail({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const product = useProduct(slug);
  const { currency } = useAppContext();
  const { addToCart } = useCart();
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<StaticImageData | null>(null);

  const isValidProduct = useMemo(() => {
    if (!product) return false;
    return toCategorySlug(product.category) === toCategorySlug(category);
  }, [product, category]);

  if (!isValidProduct || !product) {
    notFound();
  }

  const selectedImage = thumbnail ?? product.image[0];
  const categoryHref = `/products/${toCategorySlug(product.category)}`;

  return (
    <article className="w-full mt-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={categoryHref}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-primary font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 mt-6">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => {
              const isActive = selectedImage === img;
              return (
                <button
                  key={`${product._id}-${index}`}
                  type="button"
                  onClick={() => setThumbnail(img)}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                  aria-pressed={isActive}
                  className={`border max-w-24 rounded overflow-hidden cursor-pointer transition ${
                    isActive
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          <div className="border border-border max-w-100 rounded overflow-hidden bg-card">
            <Image
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium text-foreground">
            {product.name}
          </h1>

          <div className="flex items-center gap-0.5 mt-1">
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
            <p className="text-base ml-2 text-muted-foreground">
              ({product.rating})
            </p>
          </div>

          <div className="mt-6">
            <p className="text-muted-foreground line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium text-primary">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-muted-foreground">
              (inclusive of all taxes)
            </span>
          </div>

          <h2 className="text-base font-medium mt-6 text-foreground">
            About Product
          </h2>
          <ul className="list-disc ml-4 text-muted-foreground">
            {product.description.map((desc) => (
              <li key={desc}>{desc}</li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center mt-10 gap-4 text-base">
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product._id);
                toast.success("Added to cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product._id);
                router.push("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium rounded bg-primary text-primary-foreground hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
