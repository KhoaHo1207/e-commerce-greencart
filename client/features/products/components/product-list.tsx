"use client";

import { useAppContext } from "@/components/providers/app-provider";
import ProductCard from "@/features/products/components/product-card";
import { useFilterProducts } from "@/features/products/hooks/use-product";
import { toCategorySlug } from "@/lib/slug";
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
      <p className="mt-6">
        Results: <span className="font-bold text-primary">{totalProducts}</span>{" "}
        found
      </p>

      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mt-6">
          {filteredProducts.map((product) => (
            <li key={product._id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-16 italic text-center text-lg text-muted-foreground">
          No products found
        </p>
      )}
    </>
  );
}
