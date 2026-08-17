"use client";

import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug } from "@/hooks/use-product";
import { useParams } from "next/navigation";

export default function ProductsHeading() {
  const { categories } = useAppContext();
  const params = useParams<{ category?: string }>();
  const categorySlug = params.category;

  const currentCategory = categories.find(
    (category) => toCategorySlug(category.path) === categorySlug
  );

  const title = currentCategory?.text ?? "All Products";

  return (
    <div className="flex flex-col items-end w-max">
      <p className="text-2xl font-medium uppercase">{title}</p>
      <div className="w-16 h-0.5 bg-primary rounded-full" />
    </div>
  );
}
