import Products from "@/components/product/Products";
import { getProducts } from "@/lib/productActions";

export default async function page() {
  const { products, error } = await getProducts();

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Products products={products} />
    </div>
  );
}
