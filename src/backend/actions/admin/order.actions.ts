"use server";

import { prisma } from "@/backend/db/client";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function adminGetOrders() {
  try {
    return await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        address: true,
        items: true,
        payment: true,
      },
    });
  } catch (error) {
    console.error("[adminGetOrders] Error:", error);
    return [];
  }
}

export async function adminGetOrderDetails(orderId: string) {
  try {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        address: true,
        items: true,
        payment: true,
        couponRedemption: {
          include: { coupon: true },
        },
      },
    });
  } catch (error) {
    console.error("[adminGetOrderDetails] Error:", error);
    return null;
  }
}

export async function adminUpdateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { success: false, error: "Order not found" };

  const validTransitions: Record<string, string[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED", "CANCELLED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  const allowed = validTransitions[order.status] || [];
  if (!allowed.includes(newStatus)) {
    return {
      success: false,
      error: `Invalid status transition from ${order.status} to ${newStatus}`,
    };
  }

  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    await prisma.auditLog.create({
      data: {
        action: "ORDER_STATUS_CHANGED",
        entityType: "Order",
        entityId: orderId,
        summary: `Order ${orderId} transitioned from ${order.status} to ${newStatus}`,
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    revalidatePath(`/track-order`);
    return { success: true, order: updated };
  } catch (error) {
    console.error("[adminUpdateOrderStatus] Error:", error);
    return { success: false, error: "Failed to update order status" };
  }
}

