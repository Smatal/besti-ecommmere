import { adminGetCategories } from "@/backend/actions/admin/category.actions";
import { CategoriesClient } from "@/frontend/components/admin/CategoriesClient";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await adminGetCategories();

  return <CategoriesClient categories={categories} />;
}

