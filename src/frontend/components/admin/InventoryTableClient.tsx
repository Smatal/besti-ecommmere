"use client";

import { useState, useMemo } from "react";
import { AdminInventoryItem } from "@/backend/actions/admin/inventory.actions";
import { InventoryAdjuster } from "./InventoryAdjuster";
import { Search, AlertTriangle, Layers } from "lucide-react";

export function InventoryTableClient({ items }: { items: AdminInventoryItem[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockStatusFilter, setStockStatusFilter] = useState("all");

  const categories = useMemo(() => {
    return Array.from(new Set(items.map((i) => i.category))).filter(Boolean);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.productId.toLowerCase().includes(q);

      const matchCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      let matchStock = true;
      if (stockStatusFilter === "low") matchStock = item.isLowStock;
      else if (stockStatusFilter === "out") matchStock = item.isOutOfStock;
      else if (stockStatusFilter === "in") matchStock = !item.isLowStock && !item.isOutOfStock;

      return matchSearch && matchCategory && matchStock;
    });
  }, [items, search, categoryFilter, stockStatusFilter]);

  const lowCount = items.filter((i) => i.isLowStock).length;
  const outCount = items.filter((i) => i.isOutOfStock).length;

  return (
    <div>
      {/* Stock Health Summary Badges */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "14px 18px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Total SKUs</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800 }}>{items.length}</div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "14px 18px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 600 }}>
            Low Stock Warnings
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#b45309" }}>
            {lowCount}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "14px 18px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#b91c1c", fontWeight: 600 }}>
            Out of Stock
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#b91c1c" }}>
            {outCount}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            className="admin-input"
            style={{ paddingLeft: "36px" }}
            placeholder="Search by SKU or formulation title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="admin-select"
          value={stockStatusFilter}
          onChange={(e) => setStockStatusFilter(e.target.value)}
        >
          <option value="all">All Stock Statuses</option>
          <option value="in">Healthy Stock (&gt; Threshold)</option>
          <option value="low">Low Stock Warning</option>
          <option value="out">Out of Stock (0 units)</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Formulation</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available Units</th>
                <th>Reserved</th>
                <th>Low Threshold</th>
                <th>Quick Stock Adjuster</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No inventory records match your criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "6px",
                            objectFit: "cover",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{item.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                            SKU: {item.productId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-slate">{item.category}</span>
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{item.price}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          item.isOutOfStock
                            ? "admin-badge-danger"
                            : item.isLowStock
                            ? "admin-badge-warning"
                            : "admin-badge-success"
                        }`}
                        style={{ fontSize: "0.82rem", fontWeight: 800 }}
                      >
                        {item.availableStock}
                      </span>
                    </td>
                    <td style={{ color: "#64748b" }}>{item.reservedStock}</td>
                    <td style={{ color: "#64748b" }}>{item.lowStockThreshold} units</td>
                    <td>
                      <InventoryAdjuster
                        productId={item.productId}
                        currentStock={item.availableStock}
                        lowStockThreshold={item.lowStockThreshold}
                      />
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

