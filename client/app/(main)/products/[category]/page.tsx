import { dummyCategories } from "@/constants/assets";
import { toCategorySlug } from "@/lib/slug";
import type { Metadata } from "next";
import CategoryNav from "../_components/category";
import ProductList from "../_components/product-list";
import ProductsHeading from "../_components/products-heading";

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
}: PageProps<"/products/[category]">) {
  const { category } = await params;
  return (
    <div className="mt-16 flex flex-col">
      <ProductsHeading />
      <CategoryNav />
      <ProductList category={category} />
    </div>
  );
}
