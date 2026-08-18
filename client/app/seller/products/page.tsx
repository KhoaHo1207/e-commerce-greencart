import SellerProductList from "@/features/seller/components/seller-product-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product list",
};

export default function SellerProductsPage() {
  return <SellerProductList />;
}
