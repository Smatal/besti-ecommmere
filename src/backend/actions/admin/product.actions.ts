"use server";

import { client, writeClient } from "@/backend/sanity/lib/client";
import { ALL_PRODUCTS_QUERY } from "@/backend/sanity/queries";
import { prisma } from "@/backend/db/client";
import { revalidatePath } from "next/cache";

export interface AdminProductView {
  _id: string;
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  subtitle?: string;
  image: string;
  singlePrice: number;
  singleMrp: number;
  duoPrice?: number;
  duoMrp?: number;
  volume?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  stock?: number;
  lowStockThreshold?: number;
}

export async function adminGetProducts(): Promise<AdminProductView[]> {
  try {
    const sanityProducts = await client.fetch<any[]>(ALL_PRODUCTS_QUERY);
    const inventories = await prisma.inventory.findMany();
    const inventoryMap = new Map<string, { availableStock: number; lowStockThreshold: number }>();
    inventories.forEach((inv) => {
      inventoryMap.set(inv.productId, {
        availableStock: inv.availableStock,
        lowStockThreshold: inv.lowStockThreshold,
      });
    });

    return sanityProducts.map((p) => {
      const inv = inventoryMap.get(p.id);
      return {
        ...p,
        stock: inv ? inv.availableStock : 100,
        lowStockThreshold: inv ? inv.lowStockThreshold : 15,
      };
    });
  } catch (error) {
    console.error("[adminGetProducts] Error:", error);
    return [];
  }
}

export async function adminQuickEditProduct(
  sanityDocId: string,
  data: {
    name?: string;
    singlePrice?: number;
    singleMrp?: number;
    categoryName?: string;
    subtitle?: string;
    badge?: string;
  }
) {
  try {
    const patchData: Record<string, any> = {};
    if (data.name !== undefined) patchData.name = data.name.trim();
    if (data.singlePrice !== undefined) patchData.singlePrice = Number(data.singlePrice);
    if (data.singleMrp !== undefined) patchData.singleMrp = Number(data.singleMrp);
    if (data.categoryName !== undefined) {
      patchData.categoryName = data.categoryName.trim();
      patchData.category = {
        _type: "reference",
        _ref: data.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
    }
    if (data.subtitle !== undefined) patchData.subtitle = data.subtitle.trim();
    if (data.badge !== undefined) patchData.badge = data.badge.trim();

    await writeClient.patch(sanityDocId).set(patchData).commit();

    await prisma.auditLog.create({
      data: {
        action: "PRODUCT_UPDATED",
        entityType: "Product",
        entityId: sanityDocId,
        summary: `Admin edited product ${data.name || sanityDocId}`,
        details: patchData,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("[adminQuickEditProduct] Error:", error);
    return { success: false, error: error.message || "Failed to update product" };
  }
}

export async function adminDeleteProduct(sanityDocId: string, productId?: string) {
  try {
    await writeClient.delete(sanityDocId);

    if (productId) {
      await prisma.inventory.deleteMany({
        where: { productId },
      });
    }

    await prisma.auditLog.create({
      data: {
        action: "PRODUCT_DELETED",
        entityType: "Product",
        entityId: sanityDocId,
        summary: `Admin deleted product ${productId || sanityDocId}`,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("[adminDeleteProduct] Error:", error);
    return { success: false, error: error.message || "Failed to delete product" };
  }
}

export async function adminBulkDeleteProducts(docIds: string[]) {
  try {
    const transaction = writeClient.transaction();
    docIds.forEach((id) => transaction.delete(id));
    await transaction.commit();

    await prisma.auditLog.create({
      data: {
        action: "PRODUCT_BULK_DELETED",
        entityType: "Product",
        entityId: "BULK",
        summary: `Admin bulk deleted ${docIds.length} products`,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("[adminBulkDeleteProducts] Error:", error);
    return { success: false, error: error.message || "Failed to bulk delete products" };
  }
}

export async function adminBulkUpdateCategory(docIds: string[], categoryName: string) {
  try {
    const transaction = writeClient.transaction();
    const categoryRef = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    docIds.forEach((id) => {
      transaction.patch(id, (p) =>
        p.set({
          categoryName,
          category: { _type: "reference", _ref: categoryRef },
        })
      );
    });
    await transaction.commit();

    await prisma.auditLog.create({
      data: {
        action: "PRODUCT_BULK_CATEGORY_UPDATED",
        entityType: "Product",
        entityId: "BULK",
        summary: `Admin bulk updated category to "${categoryName}" for ${docIds.length} products`,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("[adminBulkUpdateCategory] Error:", error);
    return { success: false, error: error.message || "Failed to bulk update category" };
  }
}
