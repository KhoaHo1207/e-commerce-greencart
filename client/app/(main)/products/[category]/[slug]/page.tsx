import { dummyProducts } from "@/constants/assets";
import ProductDetail from "@/features/products/components/product-detail";
import { toCategorySlug } from "@/lib/slug";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const product = dummyProducts.find((item) => item.slug === slug);

  if (
    !product ||
    toCategorySlug(product.category) !== toCategorySlug(category)
  ) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: `${product.name} — ${product.description.join(". ")}`,
    openGraph: {
      title: product.name,
      description: product.description[0],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[category]/[slug]">) {
  const { category, slug } = await params;

  return <ProductDetail category={category} slug={slug} />;
}
