"use client";

import { useState, useMemo } from "react";
import { ReturnStatusUpdater } from "./ReturnStatusUpdater";
import { ReturnStatus } from "@prisma/client";
import { Search, RotateCcw } from "lucide-react";

export function ReturnsTableClient({ returns }: { returns: any[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return returns.filter((r) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.orderId.toLowerCase().includes(q) ||
        r.customer?.name?.toLowerCase().includes(q) ||
        r.customer?.phone?.includes(q) ||
        r.reason.toLowerCase().includes(q);

      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [returns, search, statusFilter]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Returns & Refund Requests</h1>
          <p className="admin-page-subtitle">
            Manage replacement requests, return status lifecycle, and refund disbursements.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "360px" }}>
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
            placeholder="Search by Return ID, Order, or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Return Statuses</option>
          <option value="REQUESTED">REQUESTED</option>
          <option value="APPROVED">APPROVED</option>
          <option value="RECEIVED">RECEIVED</option>
          <option value="REFUNDED">REFUNDED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Return ID</th>
                <th>Order Reference</th>
                <th>Customer</th>
                <th>Return Reason</th>
                <th>Refund Target</th>
                <th>Status Progression</th>
                <th>Requested</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No return or refund requests recorded.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 700, color: "#0f766e" }}>{r.id.slice(0, 13)}...</td>
                    <td style={{ fontWeight: 600 }}>{r.orderId}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{r.customer?.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{r.customer?.phone}</div>
                    </td>
                    <td style={{ maxWidth: "300px" }}>{r.reason}</td>
                    <td style={{ fontWeight: 700 }}>₹{r.refundAmount}</td>
                    <td>
                      <ReturnStatusUpdater returnId={r.id} currentStatus={r.status} />
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
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
