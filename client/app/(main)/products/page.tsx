import ProductsView from "@/features/products/components/products-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all fresh groceries, fruits, vegetables, dairy, bakery, and daily essentials at GreenCart.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
