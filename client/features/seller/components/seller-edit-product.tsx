"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSellerProducts } from "../hooks/use-seller-products";
import type { ProductImage } from "@/features/products/types/product.types";
import type { SellerProductSchema } from "../schemas/seller-product.schema";
import SellerPageHeader from "./seller-page-header";
import SellerProductForm from "./seller-product-form";

export default function SellerEditProduct() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { categories, getProduct, updateProduct } = useSellerProducts();
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="flex flex-col gap-4">
        <SellerPageHeader title="Product not found" />
        <Button asChild variant="outline">
          <Link href="/seller/products">Back to list</Link>
        </Button>
      </div>
    );
  }

  function handleSubmit(values: SellerProductSchema, images: ProductImage[]) {
    const next = updateProduct(product._id, values, images);
    if (!next) return;
    toast.success(`${next.name} updated`);
    router.push("/seller/products");
  }

  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Edit product"
        description={product.name}
      />
      <SellerProductForm
        key={product._id}
        product={product}
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </div>
  );
}
