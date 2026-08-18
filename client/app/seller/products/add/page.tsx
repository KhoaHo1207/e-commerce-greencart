import SellerAddProduct from "@/features/seller/components/seller-add-product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add product",
};

export default function SellerAddProductPage() {
  return <SellerAddProduct />;
}
