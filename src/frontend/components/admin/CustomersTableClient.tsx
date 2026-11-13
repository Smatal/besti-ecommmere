"use client";

import { useState, useMemo } from "react";
import { AdminCustomerView } from "@/backend/actions/admin/customer.actions";
import { Search, UserCheck, Phone, Mail } from "lucide-react";

export function CustomersTableClient({ customers }: { customers: AdminCustomerView[] }) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q))
    );
  }, [customers, search]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Customer Directory</h1>
          <p className="admin-page-subtitle">
            Customer profiles, transaction histories, and Lifetime Value (LTV) records.
          </p>
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: "380px", marginBottom: "16px" }}>
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
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Profile</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Orders Count</th>
                <th>Total Spent (LTV)</th>
                <th>Last Order</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No customer records found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            backgroundColor: "#0f766e",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{c.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b" }}>ID: {c.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Phone size={14} color="#64748b" />
                        <span style={{ fontWeight: 600 }}>{c.phone}</span>
                      </div>
                    </td>
                    <td>
                      {c.email ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Mail size={14} color="#64748b" />
                          <span>{c.email}</span>
                        </div>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>—</span>
                      )}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-slate">{c.ordersCount} orders</span>
                    </td>
                    <td style={{ fontWeight: 800, color: "#0f766e" }}>
                      ₹{c.totalSpent.toLocaleString("en-IN")}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {c.lastOrderDate
                        ? new Date(c.lastOrderDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Never"}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {new Date(c.joinedAt).toLocaleDateString("en-IN", {
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

