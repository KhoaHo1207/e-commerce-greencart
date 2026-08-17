"use client";

import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug } from "@/hooks/use-product";
import type { Category } from "@/types/category";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryNav() {
  const { categories } = useAppContext();
  const params = useParams<{ category?: string }>();
  const activeCategory = params.category;

  return (
    <>
      {categories && categories.length > 0 ? (
        <div className="flex flex-wrap gap-2 items-center mt-8">
          <Link
            href="/products"
            className={`text-sm border border-border rounded px-4 py-2 cursor-pointer hover:bg-muted transition-all duration-300 ${
              !activeCategory ? "bg-muted" : ""
            }`}
          >
            All
          </Link>
          {categories.map((cat) => {
            const slug = toCategorySlug(cat.path);
            return (
              <CategoryItem
                key={cat.text}
                category={cat}
                slug={slug}
                isActive={slug === activeCategory}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}

function CategoryItem({
  category,
  slug,
  isActive,
}: {
  category: Category;
  slug: string;
  isActive: boolean;
}) {
  return (
    <Link
      className={`text-sm border border-border rounded px-4 py-2 cursor-pointer hover:bg-muted transition-all duration-300 ${
        isActive ? "bg-muted" : ""
      }`}
      href={`/products/${slug}`}
    >
      {category.text}
    </Link>
  );
}
