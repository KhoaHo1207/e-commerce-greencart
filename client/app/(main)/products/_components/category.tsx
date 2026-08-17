"use client";

import { useAppContext } from "@/contexts/app-provider";
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
          {categories.map((cat) => (
            <CategoryItem
              key={cat.text}
              category={cat}
              isActive={cat.path.toLowerCase().replace(" ", "-") === category}
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
      href={`/products?category=${category.path
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      {category.text}
    </Link>
  );
}
