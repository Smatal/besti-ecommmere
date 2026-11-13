"use client";

import { useState, useMemo } from "react";
import { ReviewModerator } from "./ReviewModerator";
import { ReviewStatus } from "@prisma/client";
import { Star, Search, ShieldCheck } from "lucide-react";

interface ReviewItem {
  id: string;
  productId: string;
  customerId: string | null;
  customerName: string;
  rating: number;
  title: string | null;
  comment: string;
  status: ReviewStatus;
  verifiedBuyer: boolean;
  createdAt: Date | string;
}

export function ReviewsTableClient({ reviews }: { reviews: ReviewItem[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.customerName.toLowerCase().includes(q) ||
        r.productId.toLowerCase().includes(q) ||
        (r.title && r.title.toLowerCase().includes(q)) ||
        r.comment.toLowerCase().includes(q);

      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [reviews, search, statusFilter]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Reviews & Testimonials Moderation</h1>
          <p className="admin-page-subtitle">
            Review customer feedback, verify buyer credentials, and approve ratings for publication.
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
            placeholder="Search by customer, SKU or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Moderation Statuses</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product SKU</th>
                <th>Rating</th>
                <th>Feedback / Review</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No customer reviews found.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{r.customerName}</div>
                      {r.verifiedBuyer && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.7rem",
                            color: "#15803d",
                            fontWeight: 600,
                          }}
                        >
                          <ShieldCheck size={12} />
                          <span>Verified Buyer</span>
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 600, color: "#0f766e" }}>{r.productId}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", color: "#eab308" }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < r.rating ? "#eab308" : "none"}
                            color={i < r.rating ? "#eab308" : "#cbd5e1"}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={{ maxWidth: "420px" }}>
                      {r.title && <div style={{ fontWeight: 700, marginBottom: "2px" }}>{r.title}</div>}
                      <div style={{ fontSize: "0.82rem", color: "#334155" }}>{r.comment}</div>
                    </td>
                    <td>
                      <ReviewModerator reviewId={r.id} currentStatus={r.status} />
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

