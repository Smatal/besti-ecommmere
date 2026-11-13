"use server";

import { prisma } from "@/backend/db/client";

export interface AdminCustomerView {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string | null;
  joinedAt: string;
}

export async function adminGetCustomers(): Promise<AdminCustomerView[]> {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orders: {
          select: {
            id: true,
            totalAmount: true,
            createdAt: true,
            status: true,
          },
        },
      },
    });

    return customers.map((c) => {
      const validOrders = c.orders.filter((o) => o.status !== "CANCELLED");
      const totalSpent = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      const lastOrder = c.orders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
        ordersCount: c.orders.length,
        totalSpent,
        lastOrderDate: lastOrder ? lastOrder.createdAt.toISOString() : null,
        joinedAt: c.createdAt.toISOString(),
      };
    });
  } catch (error) {
    console.error("[adminGetCustomers] Error:", error);
    return [];
  }
}

