"use server";

import { prisma } from "@/backend/db/client";
import { client } from "@/backend/sanity/lib/client";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  todayOrders: number;
  recentOrders: {
    id: string;
    customerName: string;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
  }[];
  ordersByStatus: Record<string, number>;
}

export async function adminGetDashboardStats(): Promise<DashboardStats> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      orders,
      customersCount,
      inventories,
      sanityProductsCount,
    ] = await Promise.all([
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { customer: true },
      }),
      prisma.customer.count(),
      prisma.inventory.findMany(),
      client.fetch<number>(`count(*[_type == "product"])`),
    ]);

    let totalRevenue = 0;
    let todayOrders = 0;
    const ordersByStatus: Record<string, number> = {
      PENDING: 0,
      CONFIRMED: 0,
      PROCESSING: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };

    orders.forEach((o) => {
      if (o.status !== "CANCELLED") {
        totalRevenue += o.totalAmount;
      }
      if (new Date(o.createdAt) >= today) {
        todayOrders++;
      }
      ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
    });

    const lowStockCount = inventories.filter(
      (inv) => inv.availableStock <= inv.lowStockThreshold
    ).length;

    const recentOrders = orders.slice(0, 5).map((o) => ({
      id: o.id,
      customerName: o.customer.name,
      totalAmount: o.totalAmount,
      status: o.status,
      paymentMethod: o.paymentMethod,
      createdAt: o.createdAt.toISOString(),
    }));

    return {
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers: customersCount,
      totalProducts: sanityProductsCount || 0,
      lowStockCount,
      todayOrders,
      recentOrders,
      ordersByStatus,
    };
  } catch (error) {
    console.error("[adminGetDashboardStats] Error:", error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0,
      lowStockCount: 0,
      todayOrders: 0,
      recentOrders: [],
      ordersByStatus: {},
    };
  }
}

