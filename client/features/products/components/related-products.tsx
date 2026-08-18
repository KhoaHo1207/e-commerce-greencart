"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "./product-card";
import { useRelatedProducts } from "../hooks/use-product";
import Link from "next/link";

export default function RelatedProducts({
  productId,
  category,
}: {
  productId: string;
  category: string;
}) {
  const relatedProducts = useRelatedProducts(productId, category);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="related-products-heading">
      <div className="flex flex-col items-end w-max">
        <h2
          id="related-products-heading"
          className="text-2xl font-medium uppercase"
        >
          Related Products
        </h2>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mt-6">
        {relatedProducts.map((product) => (
          <li key={product._id} className="min-w-0">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-8">
        <Button asChild className="h-10 px-8 rounded">
          <Link href="/products">See more</Link>
        </Button>
      </div>
    </section>
  );
}
