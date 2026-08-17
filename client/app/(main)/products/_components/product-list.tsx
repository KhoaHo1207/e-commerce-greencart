"use client";

import ProductCard from "@/components/product-card";
import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug, useFilterProducts } from "@/hooks/use-product";
import { notFound } from "next/navigation";

export default function ProductList({ category }: { category?: string }) {
  const { categories } = useAppContext();
  const { filteredProducts, totalProducts } = useFilterProducts(category);

  if (
    category &&
    !categories.some((item) => toCategorySlug(item.path) === category)
  ) {
    notFound();
  }

  return (
    <>
      <div className="mt-6">
        Results: <span className="font-bold text-primary">{totalProducts}</span>{" "}
        found
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 italic text-center text-lg text-muted-foreground">
          No products found
        </div>
      )}
    </>
  );
}
