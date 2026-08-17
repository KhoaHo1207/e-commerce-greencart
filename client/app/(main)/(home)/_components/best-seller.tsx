"use client";

import ProductCard from "@/components/product-card";
import { useAppContext } from "@/contexts/app-provider";

export default function BestSeller() {
  const { products } = useAppContext();

  return (
    <section
      id="best-sellers"
      className="mt-16"
      aria-labelledby="best-sellers-heading"
    >
      <h2
        id="best-sellers-heading"
        className="text-2xl md:text-3xl font-medium text-foreground"
      >
        Best Sellers
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product) => (
            <li key={product._id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </section>
  );
}
