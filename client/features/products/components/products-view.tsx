import CategoryNav from "@/features/categories/components/category-nav";
import ProductList from "@/features/products/components/product-list";
import ProductsHeading from "@/features/products/components/products-heading";

export default function ProductsView({
  category,
  query,
}: {
  category?: string;
  query?: string;
}) {
  return (
    <div className="mt-16 flex flex-col">
      <ProductsHeading query={query} />
      <CategoryNav />
      <ProductList category={category} query={query} />
    </div>
  );
}
