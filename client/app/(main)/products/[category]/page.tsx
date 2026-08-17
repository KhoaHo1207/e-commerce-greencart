import CategoryNav from "../_components/category";
import ProductList from "../_components/product-list";
import ProductsHeading from "../_components/products-heading";

export default async function ProductCategoryPage({
  params,
}: PageProps<"/products/[category]">) {
  const { category } = await params;

  return (
    <div className="mt-16 flex flex-col">
      <ProductsHeading />
      <CategoryNav />
      <ProductList category={category} />
    </div>
  );
}
