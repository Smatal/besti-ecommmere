import { adminGetOrders } from "@/backend/actions/admin/order.actions";
import { OrdersTableClient, OrderWithDetails } from "@/frontend/components/admin/OrdersTableClient";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const rawOrders = await adminGetOrders();

  const formattedOrders: OrderWithDetails[] = rawOrders.map((o) => ({
    ...o,
    couponCode: o.couponCode || null,
    payment: o.payment || null,
  }));

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Order Management</h1>
          <p className="admin-page-subtitle">
            Manage transactions, tracking, and finite-state status progressions.
          </p>
        </div>
      </div>

      <OrdersTableClient orders={formattedOrders} />
    </div>
  );
}
