import type { Metadata } from "next";
import CategoryNav from "./_components/category";
import ProductList from "./_components/product-list";
import ProductsHeading from "./_components/products-heading";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all fresh groceries, fruits, vegetables, dairy, bakery, and daily essentials at GreenCart.",
};

export default function ProductsPage() {
  return (
    <div className="mt-16 flex flex-col">
      <ProductsHeading />
      <CategoryNav />
      <ProductList />
    </div>
  );
}
