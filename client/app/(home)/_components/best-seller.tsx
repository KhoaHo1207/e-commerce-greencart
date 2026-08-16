"use client";

import ProductCard from "@/components/product-card";
import { useAppContext } from "@/contexts/app-provider";

export default function BestSeller() {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
