import Link from "next/link";
import { adminGetDashboardStats } from "@/backend/actions/admin/dashboard.actions";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  ArrowRight,
  Upload,
  Plus,
  Tag,
} from "lucide-react";

export const revalidate = 0; // Dynamic server component

export default async function AdminDashboardPage() {
  const stats = await adminGetDashboardStats();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Store Operations Dashboard</h1>
          <p className="admin-page-subtitle">
            Real-time analytics across Neon Database, Sanity CMS, and Razorpay.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link href="/admin/products/import" className="admin-btn admin-btn-outline">
            <Upload size={16} />
            <span>Bulk Import Excel</span>
          </Link>
          <Link href="/admin/studio" className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Sanity Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Gross Revenue</div>
          <div className="admin-kpi-value" style={{ color: "#0f766e" }}>
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="admin-kpi-footer">
            <span>From {stats.totalOrders} total orders</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Total Orders</div>
          <div className="admin-kpi-value">{stats.totalOrders}</div>
          <div className="admin-kpi-footer">
            <span style={{ color: "#0f766e", fontWeight: 600 }}>
              +{stats.todayOrders} new today
            </span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Registered Customers</div>
          <div className="admin-kpi-value">{stats.totalCustomers}</div>
          <div className="admin-kpi-footer">
            <span>Verified buyer profiles</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Sanity Catalog Items</div>
          <div className="admin-kpi-value">{stats.totalProducts}</div>
          <div className="admin-kpi-footer">
            <span>Active clinical formulations</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Low Stock Alerts</div>
          <div
            className="admin-kpi-value"
            style={{ color: stats.lowStockCount > 0 ? "#b45309" : "#15803d" }}
          >
            {stats.lowStockCount}
          </div>
          <div className="admin-kpi-footer">
            <Link
              href="/admin/inventory"
              style={{ color: "#0f766e", fontWeight: 600, textDecoration: "underline" }}
            >
              Review inventory →
            </Link>
          </div>
        </div>
      </div>

      {/* Order Status Distribution & Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Order Status Pipeline</div>
            <Link href="/admin/orders" className="admin-btn admin-btn-outline admin-btn-sm">
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {Object.entries(stats.ordersByStatus).map(([status, count]) => (
              <div
                key={status}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>
                  {status}
                </span>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: count > 0 ? "#0f172a" : "#94a3b8",
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Quick Administrative Actions</div>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/admin/products/import"
              className="admin-btn admin-btn-outline"
              style={{ justifyContent: "flex-start", height: "42px" }}
            >
              <Upload size={18} color="#0f766e" />
              <span>Import Products Spreadsheet (Excel/CSV)</span>
            </Link>
            <Link
              href="/admin/inventory"
              className="admin-btn admin-btn-outline"
              style={{ justifyContent: "flex-start", height: "42px" }}
            >
              <Package size={18} color="#0f766e" />
              <span>Adjust Neon DB Inventory & Stock Levels</span>
            </Link>
            <Link
              href="/admin/marketing"
              className="admin-btn admin-btn-outline"
              style={{ justifyContent: "flex-start", height: "42px" }}
            >
              <Tag size={18} color="#0f766e" />
              <span>Issue New Promotional Coupon Code</span>
            </Link>
            <Link
              href="/admin/studio"
              className="admin-btn admin-btn-outline"
              style={{ justifyContent: "flex-start", height: "42px" }}
            >
              <Plus size={18} color="#0f766e" />
              <span>Open Embedded Sanity Studio CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title">Recent Customer Orders</div>
          <Link href="/admin/orders" className="admin-btn admin-btn-outline admin-btn-sm">
            <span>Manage All Orders</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No orders placed yet. Test checkout on storefront to generate orders.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 700, color: "#0f766e" }}>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td style={{ fontWeight: 700 }}>₹{order.totalAmount.toLocaleString("en-IN")}</td>
                    <td>
                      <span className="admin-badge admin-badge-slate">{order.paymentMethod}</span>
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${
                          order.status === "DELIVERED"
                            ? "admin-badge-success"
                            : order.status === "CANCELLED"
                            ? "admin-badge-danger"
                            : "admin-badge-warning"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ color: "#64748b", fontSize: "0.8rem" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
