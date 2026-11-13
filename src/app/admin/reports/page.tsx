import { prisma } from "@/backend/db/client";
import { BarChart3, TrendingUp, CreditCard, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function AdminReportsPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
      payment: true,
    },
  });

  const validOrders = orders.filter((o) => o.status !== "CANCELLED");
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
  const totalDiscounts = validOrders.reduce((sum, o) => sum + o.discountAmount, 0);

  // Payment Breakdown
  const paymentCounts: Record<string, { count: number; volume: number }> = {
    UPI: { count: 0, volume: 0 },
    CARD: { count: 0, volume: 0 },
    COD: { count: 0, volume: 0 },
  };

  validOrders.forEach((o) => {
    const method = o.paymentMethod || "COD";
    if (!paymentCounts[method]) paymentCounts[method] = { count: 0, volume: 0 };
    paymentCounts[method].count++;
    paymentCounts[method].volume += o.totalAmount;
  });

  // Top Products
  const productVolumeMap: Record<string, { name: string; units: number; revenue: number }> = {};
  validOrders.forEach((o) => {
    o.items.forEach((item) => {
      if (!productVolumeMap[item.productId]) {
        productVolumeMap[item.productId] = {
          name: item.productName,
          units: 0,
          revenue: 0,
        };
      }
      productVolumeMap[item.productId].units += item.quantity;
      productVolumeMap[item.productId].revenue += item.totalPrice;
    });
  });

  const topProducts = Object.entries(productVolumeMap)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Financial Reports & Sales Intelligence</h1>
          <p className="admin-page-subtitle">
            Revenue velocity, payment instrument distribution, and top clinical performers.
          </p>
        </div>
      </div>

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Total Realized Revenue</div>
          <div className="admin-kpi-value" style={{ color: "#0f766e" }}>
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="admin-kpi-footer">
            <span>Excludes cancelled transactions</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Average Order Value (AOV)</div>
          <div className="admin-kpi-value">₹{avgOrderValue.toLocaleString("en-IN")}</div>
          <div className="admin-kpi-footer">
            <span>Per validated customer checkout</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Promotional Discounts Given</div>
          <div className="admin-kpi-value" style={{ color: "#b45309" }}>
            ₹{totalDiscounts.toLocaleString("en-IN")}
          </div>
          <div className="admin-kpi-footer">
            <span>Via active coupon redemptions</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">Completed Checkouts</div>
          <div className="admin-kpi-value">{validOrders.length}</div>
          <div className="admin-kpi-footer">
            <span>Total orders across all channels</span>
          </div>
        </div>
      </div>

      {/* Grid: Payment Instrument Breakdown + Top Products */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Payment Instruments */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Payment Instruments Share</div>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {Object.entries(paymentCounts).map(([method, data]) => {
              const pct = totalRevenue > 0 ? Math.round((data.volume / totalRevenue) * 100) : 0;
              return (
                <div key={method}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    <span>{method}</span>
                    <span>
                      ₹{data.volume.toLocaleString("en-IN")} ({pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        backgroundColor:
                          method === "UPI" ? "#0f766e" : method === "CARD" ? "#2563eb" : "#d97706",
                        borderRadius: "9999px",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>
                    {data.count} successful transactions
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Top Formulations by Volume</div>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Units Sold</th>
                  <th>Gross Sales</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: "24px", color: "#64748b" }}>
                      No sales recorded yet.
                    </td>
                  </tr>
                ) : (
                  topProducts.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>
                        <span className="admin-badge admin-badge-slate">{p.units} units</span>
                      </td>
                      <td style={{ fontWeight: 700, color: "#0f766e" }}>
                        ₹{p.revenue.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
