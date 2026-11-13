import { adminGetProducts } from "@/backend/actions/admin/product.actions";
import { ProductTableClient } from "@/frontend/components/admin/ProductTableClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await adminGetProducts();

  return <ProductTableClient products={products} />;
}
