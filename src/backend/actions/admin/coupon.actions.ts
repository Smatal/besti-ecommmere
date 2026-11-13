"use server";

import { prisma } from "@/backend/db/client";
import { revalidatePath } from "next/cache";

export async function adminGetCoupons() {
  try {
    return await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { redemptions: true },
        },
      },
    });
  } catch (error) {
    console.error("[adminGetCoupons] Error:", error);
    return [];
  }
}

export async function adminCreateCoupon(data: {
  code: string;
  discountPercent?: number | null;
  flatDiscount?: number | null;
  minOrderValue?: number;
  maxDiscount?: number | null;
  maxUses?: number | null;
  expiresAt?: string | null;
}) {
  try {
    const code = data.code.trim().toUpperCase();
    if (!code) return { success: false, error: "Coupon code is required" };

    if (!data.discountPercent && !data.flatDiscount) {
      return { success: false, error: "Must specify discount percentage or flat discount" };
    }

    const created = await prisma.coupon.create({
      data: {
        code,
        discountPercent: data.discountPercent ? Number(data.discountPercent) : null,
        flatDiscount: data.flatDiscount ? Number(data.flatDiscount) : null,
        minOrderValue: Number(data.minOrderValue) || 0,
        maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : null,
        maxUses: data.maxUses ? Number(data.maxUses) : null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        isActive: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "COUPON_CREATED",
        entityType: "Coupon",
        entityId: created.id,
        summary: `Admin created coupon ${code}`,
        details: data,
      },
    });

    revalidatePath("/admin/marketing");
    return { success: true, coupon: created };
  } catch (error: any) {
    console.error("[adminCreateCoupon] Error:", error);
    return { success: false, error: error.message || "Failed to create coupon" };
  }
}

export async function adminToggleCoupon(couponId: string, isActive: boolean) {
  try {
    const updated = await prisma.coupon.update({
      where: { id: couponId },
      data: { isActive },
    });

    await prisma.auditLog.create({
      data: {
        action: "COUPON_TOGGLED",
        entityType: "Coupon",
        entityId: couponId,
        summary: `Coupon ${updated.code} set to ${isActive ? "ACTIVE" : "INACTIVE"}`,
      },
    });

    revalidatePath("/admin/marketing");
    return { success: true, coupon: updated };
  } catch (error: any) {
    console.error("[adminToggleCoupon] Error:", error);
    return { success: false, error: error.message || "Failed to toggle coupon" };
  }
}

export async function adminDeleteCoupon(couponId: string) {
  try {
    const deleted = await prisma.coupon.delete({
      where: { id: couponId },
    });

    await prisma.auditLog.create({
      data: {
        action: "COUPON_DELETED",
        entityType: "Coupon",
        entityId: couponId,
        summary: `Admin deleted coupon ${deleted.code}`,
      },
    });

    revalidatePath("/admin/marketing");
    return { success: true };
  } catch (error: any) {
    console.error("[adminDeleteCoupon] Error:", error);
    return { success: false, error: error.message || "Failed to delete coupon" };
  }
}
