import { dummyCategories } from "@/constants/assets";
import ProductsView from "@/features/products/components/products-view";
import { parseSearchQuery } from "@/features/products/utils/filter-products";
import { toCategorySlug } from "@/lib/slug";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const match = dummyCategories.find(
    (item) => toCategorySlug(item.path) === toCategorySlug(category),
  );
  const name = match?.text ?? category.replace(/-/g, " ");

  return {
    title: name,
    description: `Shop ${name} at GreenCart. Fresh products with fast delivery.`,
  };
}

export default async function ProductCategoryPage({
  params,
  searchParams,
}: PageProps<"/products/[category]">) {
  const { category } = await params;
  const { q } = await searchParams;
  return <ProductsView category={category} query={parseSearchQuery(q)} />;
}
