"use client";

import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug } from "@/hooks/use-product";
import type { Category } from "@/types/category";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Category() {
  const { categories } = useAppContext();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      {categories && categories.length > 0 ? (
        <div className="flex flex-wrap gap-2 items-center mt-8">
          <Link
            href="/products"
            className={`text-sm border border-border rounded px-4 py-2 cursor-pointer hover:bg-muted transition-all duration-300 ${
              !category ? "bg-muted" : ""
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <CategoryItem
              key={cat.text}
              category={cat}
              isActive={toCategorySlug(cat.path) === category}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function CategoryItem({
  category,
  isActive,
}: {
  category: Category;
  isActive: boolean;
}) {
  return (
    <Link
      className={`text-sm border border-border rounded px-4 py-2 cursor-pointer hover:bg-muted transition-all duration-300 ${
        isActive ? "bg-muted" : ""
      }`}
      href={`/products?category=${toCategorySlug(category.path)}`}
    >
      {category.text}
    </Link>
  );
}
