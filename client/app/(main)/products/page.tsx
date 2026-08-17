"use client";

import ProductCard from "@/components/product-card";
import { useFilterProducts } from "@/hooks/use-product";
import Category from "./_components/category";

export default function ProductsPage() {
  const { filteredProducts: products, totalProducts, category } = useFilterProducts();

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">
          {category ? category.replace(/-/g, " ") : "All Products"}
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <Category />

      <div className="mt-6">
        Results: <span className="font-bold text-primary">{totalProducts}</span>{" "}
        found
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 italic text-center text-lg text-muted-foreground">
          No products found
        </div>
      )}
    </div>
  );
}
