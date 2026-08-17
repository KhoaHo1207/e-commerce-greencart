"use client";

import { useAppContext } from "@/contexts/app-provider";
import { toCategorySlug } from "@/hooks/use-product";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const { categories } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium text-foreground">
        Categories
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.map((category) => {
          const slug = toCategorySlug(category.path);
          return (
            <Link
              className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center ring-1 ring-black/5 dark:ring-white/10"
              key={category.path}
              style={{ backgroundColor: category.bgColor }}
              href={`/products/${slug}`}
            >
              <Image
                src={category.image}
                alt={category.text}
                className="group-hover:scale-108 transition max-w-28"
              />
              <p className="text-sm font-bold text-stone-800">
                {category.text}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
