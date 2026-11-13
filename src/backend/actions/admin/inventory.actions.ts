"use server";

import { prisma } from "@/backend/db/client";
import { client } from "@/backend/sanity/lib/client";
import { ALL_PRODUCTS_QUERY } from "@/backend/sanity/queries";
import { revalidatePath } from "next/cache";

export interface AdminInventoryItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  image: string;
  price: number;
  availableStock: number;
  reservedStock: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
  updatedAt: string;
}

export async function adminGetInventory(): Promise<AdminInventoryItem[]> {
  try {
    const [sanityProducts, dbInventories] = await Promise.all([
      client.fetch<any[]>(ALL_PRODUCTS_QUERY),
      prisma.inventory.findMany({ orderBy: { productId: "asc" } }),
    ]);

    const productMap = new Map<string, any>(sanityProducts.map((p) => [p.id, p]));

    return dbInventories.map((inv) => {
      const prod = productMap.get(inv.productId);
      const isLowStock = inv.availableStock <= inv.lowStockThreshold && inv.availableStock > 0;
      const isOutOfStock = inv.availableStock <= 0;

      return {
        id: inv.id,
        productId: inv.productId,
        name: prod?.name || inv.productId,
        category: prod?.categoryName || prod?.category || "Clinical Care",
        image: prod?.image || "/client_assets/sunscreen.jpg",
        price: prod?.singlePrice || 0,
        availableStock: inv.availableStock,
        reservedStock: inv.reservedStock,
        lowStockThreshold: inv.lowStockThreshold,
        isLowStock,
        isOutOfStock,
        updatedAt: inv.updatedAt.toISOString(),
      };
    });
  } catch (error) {
    console.error("[adminGetInventory] Error:", error);
    return [];
  }
}

export async function adminAdjustStock(productId: string, delta: number, reason?: string) {
  try {
    const existing = await prisma.inventory.findUnique({
      where: { productId },
    });

    if (!existing) {
      return { success: false, error: "Inventory record not found" };
    }

    const newStock = Math.max(0, existing.availableStock + delta);

    const updated = await prisma.inventory.update({
      where: { productId },
      data: { availableStock: newStock },
    });

    await prisma.auditLog.create({
      data: {
        action: "STOCK_ADJUSTED",
        entityType: "Inventory",
        entityId: productId,
        summary: `Stock for ${productId} adjusted by ${delta > 0 ? "+" + delta : delta} (New: ${newStock}). Reason: ${reason || "Manual Adjustment"}`,
        details: { oldStock: existing.availableStock, newStock, delta, reason },
      },
    });

    revalidatePath("/admin/inventory");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/products");
    return { success: true, item: updated };
  } catch (error: any) {
    console.error("[adminAdjustStock] Error:", error);
    return { success: false, error: error.message || "Failed to adjust stock" };
  }
}

export async function adminUpdateStockThreshold(productId: string, threshold: number) {
  try {
    const updated = await prisma.inventory.update({
      where: { productId },
      data: { lowStockThreshold: Math.max(0, threshold) },
    });

    await prisma.auditLog.create({
      data: {
        action: "STOCK_THRESHOLD_UPDATED",
        entityType: "Inventory",
        entityId: productId,
        summary: `Low stock threshold for ${productId} updated to ${threshold}`,
      },
    });

    revalidatePath("/admin/inventory");
    revalidatePath("/admin/dashboard");
    return { success: true, item: updated };
  } catch (error: any) {
    console.error("[adminUpdateStockThreshold] Error:", error);
    return { success: false, error: error.message || "Failed to update threshold" };
  }
}

