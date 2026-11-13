"use server";

import { client, writeClient } from "@/backend/sanity/lib/client";
import { ALL_CATEGORIES_QUERY, ALL_PRODUCTS_QUERY } from "@/backend/sanity/queries";
import { prisma } from "@/backend/db/client";
import { revalidatePath } from "next/cache";

export interface AdminCategoryItem {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
}

export async function adminGetCategories(): Promise<AdminCategoryItem[]> {
  try {
    const [categories, products] = await Promise.all([
      client.fetch<any[]>(ALL_CATEGORIES_QUERY),
      client.fetch<any[]>(ALL_PRODUCTS_QUERY),
    ]);

    const counts = new Map<string, number>();
    products.forEach((p) => {
      const catKey = p.category || "other";
      counts.set(catKey, (counts.get(catKey) || 0) + 1);
    });

    return categories.map((cat) => ({
      _id: cat._id,
      id: cat.id || cat.slug || cat._id,
      name: cat.name,
      slug: cat.slug || cat.id,
      description: cat.description || "",
      productCount: counts.get(cat.id) || counts.get(cat.slug) || 0,
    }));
  } catch (error) {
    console.error("[adminGetCategories] Error:", error);
    return [];
  }
}

export async function adminCreateCategory(name: string, description?: string) {
  try {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: "Category name is required" };

    const slugStr = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const newDoc = await writeClient.create({
      _type: "category",
      id: slugStr,
      name: trimmed,
      slug: { _type: "slug", current: slugStr },
      description: description?.trim() || "",
    });

    await prisma.auditLog.create({
      data: {
        action: "CATEGORY_CREATED",
        entityType: "Category",
        entityId: newDoc._id,
        summary: `Admin created category "${trimmed}"`,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, category: newDoc };
  } catch (error: any) {
    console.error("[adminCreateCategory] Error:", error);
    return { success: false, error: error.message || "Failed to create category" };
  }
}

export async function adminDeleteCategory(categoryId: string) {
  try {
    await writeClient.delete(categoryId);

    await prisma.auditLog.create({
      data: {
        action: "CATEGORY_DELETED",
        entityType: "Category",
        entityId: categoryId,
        summary: `Admin deleted category ${categoryId}`,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("[adminDeleteCategory] Error:", error);
    return { success: false, error: error.message || "Failed to delete category" };
  }
}
