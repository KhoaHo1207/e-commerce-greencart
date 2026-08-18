import ProductsView from "@/features/products/components/products-view";
import { parseSearchQuery } from "@/features/products/utils/filter-products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all fresh groceries, fruits, vegetables, dairy, bakery, and daily essentials at GreenCart.",
};

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const { q } = await searchParams;
  return <ProductsView query={parseSearchQuery(q)} />;
}
