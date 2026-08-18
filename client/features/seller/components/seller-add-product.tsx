"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSellerProducts } from "../hooks/use-seller-products";
import type { ProductImage } from "@/features/products/types/product.types";
import type { SellerProductSchema } from "../schemas/seller-product.schema";
import SellerPageHeader from "./seller-page-header";
import SellerProductForm from "./seller-product-form";

export default function SellerAddProduct() {
  const router = useRouter();
  const { categories, addProduct } = useSellerProducts();

  function handleSubmit(values: SellerProductSchema, images: ProductImage[]) {
    const product = addProduct(values, images);
    toast.success(`${product.name} added`);
    router.push("/seller/products");
  }

  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Add product"
        description="New items appear on the storefront immediately (demo data)."
      />
      <SellerProductForm
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Add product"
      />
    </div>
  );
}
