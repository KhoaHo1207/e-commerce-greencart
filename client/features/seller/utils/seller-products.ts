import { assets } from "@/constants/assets";
import type { Category } from "@/features/categories/types/category.types";
import type {
  Product,
  ProductImage,
} from "@/features/products/types/product.types";
import { toCategorySlug } from "@/lib/slug";
import type { SellerProductSchema } from "../schemas/seller-product.schema";
import { SELLER_PRODUCT_MAX_IMAGES } from "../schemas/seller-product.schema";

export function uniqueProductSlug(
  name: string,
  products: Product[],
  excludeId?: string,
): string {
  const base = toCategorySlug(name).replace(/[^a-z0-9-]/g, "") || "product";
  let slug = base;
  let n = 2;
  while (
    products.some((product) => product.slug === slug && product._id !== excludeId)
  ) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export function parseDescriptionLines(value: string): string[] {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : [value.trim()];
}

export function fallbackProductImages(
  category: string,
  products: Product[],
): ProductImage[] {
  const match = products.find(
    (product) => product.category === category && product.image[0],
  );
  if (match) return [match.image[0]];
  return [assets.upload_area];
}

export function buildSellerProduct(
  values: SellerProductSchema,
  products: Product[],
  images: ProductImage[],
  existing?: Product,
): Product {
  const now = new Date().toISOString();
  const image =
    images.length > 0
      ? images.slice(0, SELLER_PRODUCT_MAX_IMAGES)
      : fallbackProductImages(values.category, products);

  return {
    _id: existing?._id ?? crypto.randomUUID(),
    name: values.name,
    slug: uniqueProductSlug(values.name, products, existing?._id),
    category: values.category,
    price: values.price,
    offerPrice: values.offerPrice,
    image,
    rating: existing?.rating ?? 0,
    description: parseDescriptionLines(values.description),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    inStock: values.inStock,
  };
}

export function filterSellerProducts(
  products: Product[],
  query: string,
  category: string,
  stock: "all" | "in" | "out",
): Product[] {
  const normalized = query.trim().toLowerCase();
  return products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (stock === "in" && !product.inStock) return false;
    if (stock === "out" && product.inStock) return false;
    if (!normalized) return true;
    return (
      product.name.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized)
    );
  });
}

export function categoryOptions(categories: Category[]): string[] {
  return categories.map((category) => category.path);
}

export async function filesToDataUrls(files: File[]): Promise<string[]> {
  const limited = files.slice(0, SELLER_PRODUCT_MAX_IMAGES);
  return Promise.all(
    limited.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    ),
  );
}
