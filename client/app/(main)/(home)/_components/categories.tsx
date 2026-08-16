import { categories } from "@/constants/assets";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium text-foreground">
        Categories
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.map((category, index) => {
          const path = category.path.toLowerCase().replace(" ", "-");
          return (
            <Link
              className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center ring-1 ring-black/5 dark:ring-white/10"
              key={index}
              style={{ backgroundColor: category.bgColor }}
              href={`/products?category=${path}`}
            >
              <Image
                src={category.image}
                alt={category.text}
                className="group-hover:scale-108 transition max-w-28"
              />
              <p className="text-sm font-bold text-stone-800">{category.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
