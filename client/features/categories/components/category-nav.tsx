"use client";

import { useAppContext } from "@/components/providers/app-provider";
import type { Category } from "@/features/categories/types/category.types";
import { toCategorySlug } from "@/lib/slug";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryNav() {
  const { categories } = useAppContext();
  const params = useParams<{ category?: string }>();
  const activeCategory = params.category;

  return (
    <>
      {categories && categories.length > 0 ? (
        <nav aria-label="Filter by category" className="mt-8">
          <ul className="flex flex-wrap gap-2 items-center">
            <li>
              <Link
                href="/products"
                className={`text-sm border border-border rounded px-4 py-2 hover:bg-muted transition-all duration-300 ${
                  !activeCategory ? "bg-muted" : ""
                }`}
              >
                All
              </Link>
            </li>
            {categories.map((cat) => {
              const slug = toCategorySlug(cat.path);
              return (
                <li key={cat.text}>
                  <CategoryItem
                    category={cat}
                    slug={slug}
                    isActive={slug === activeCategory}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
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
