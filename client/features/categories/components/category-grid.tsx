"use client";

import { useAppContext } from "@/components/providers/app-provider";
import { toCategorySlug } from "@/lib/slug";
import Image from "next/image";
import Link from "next/link";

export default function CategoryGrid() {
  const { categories } = useAppContext();
  return (
    <section
      id="categories"
      className="mt-16"
      aria-labelledby="categories-heading"
    >
      <h2
        id="categories-heading"
        className="text-2xl md:text-3xl font-medium text-foreground"
      >
        Categories
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 mt-6">
        {categories.map((category) => {
          const slug = toCategorySlug(category.path);
          return (
            <li key={category.path} className="min-w-0">
              <Link
                className="group w-full h-full min-w-0 cursor-pointer py-4 px-2 sm:py-5 sm:px-3 gap-2 rounded-lg flex flex-col justify-center items-center ring-1 ring-black/5 dark:ring-white/10"
                style={{ backgroundColor: category.bgColor }}
                href={`/products/${slug}`}
              >
                <Image
                  src={category.image}
                  alt=""
                  className="w-full max-w-20 sm:max-w-24 md:max-w-28 h-16 sm:h-20 object-contain group-hover:scale-105 transition"
                />
                <span className="text-xs sm:text-sm font-bold text-stone-800 text-center leading-tight">
                  {category.text}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
