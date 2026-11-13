"use client";

import { useState, useTransition } from "react";
import { adminToggleCoupon, adminDeleteCoupon } from "@/backend/actions/admin/coupon.actions";
import { CouponFormModal } from "./CouponFormModal";
import { Tag, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";

interface CouponItem {
  id: string;
  code: string;
  discountPercent: number | null;
  flatDiscount: number | null;
  minOrderValue: number;
  maxDiscount: number | null;
  maxUses: number | null;
  currentUses: number;
  isActive: boolean;
  expiresAt: Date | string | null;
  _count: {
    redemptions: number;
  };
}

export function CouponsClient({ coupons }: { coupons: CouponItem[] }) {
  const [list, setList] = useState(coupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (couponId: string, currentActive: boolean) => {
    startTransition(async () => {
      const res = await adminToggleCoupon(couponId, !currentActive);
      if (res.success && res.coupon) {
        setList((prev) =>
          prev.map((c) => (c.id === couponId ? { ...c, isActive: res.coupon!.isActive } : c))
        );
      } else {
        alert(res.error || "Failed to update coupon status");
      }
    });
  };

  const handleDelete = (couponId: string, code: string) => {
    if (!confirm(`Delete coupon "${code}"?`)) return;

    startTransition(async () => {
      const res = await adminDeleteCoupon(couponId);
      if (res.success) {
        setList((prev) => prev.filter((c) => c.id !== couponId));
      } else {
        alert(res.error || "Failed to delete coupon");
      }
    });
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Marketing & Promotional Coupons</h1>
          <p className="admin-page-subtitle">
            Configure discount codes, redemption thresholds, and promotional campaigns.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="admin-btn admin-btn-primary"
        >
          <Plus size={16} />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Benefit</th>
                <th>Min Order</th>
                <th>Usage / Cap</th>
                <th>Status</th>
                <th>Expiry Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No coupons active. Click "Create Coupon" to issue your first promo code.
                  </td>
                </tr>
              ) : (
                list.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Tag size={16} color="#0f766e" />
                        <span style={{ fontWeight: 800, letterSpacing: "0.05em", color: "#0f766e" }}>
                          {c.code}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>
                      {c.discountPercent ? `${c.discountPercent}% OFF` : `₹${c.flatDiscount} FLAT OFF`}
                      {c.maxDiscount ? (
                        <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>
                          (Up to ₹{c.maxDiscount})
                        </span>
                      ) : null}
                    </td>
                    <td>{c.minOrderValue > 0 ? `₹${c.minOrderValue}` : "No minimum"}</td>
                    <td>
                      <span className="admin-badge admin-badge-slate">
                        {c._count.redemptions} {c.maxUses ? `/ ${c.maxUses}` : "used"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggle(c.id, c.isActive)}
                        disabled={isPending}
                        className={`admin-badge ${
                          c.isActive ? "admin-badge-success" : "admin-badge-slate"
                        }`}
                        style={{ cursor: "pointer", border: "none" }}
                      >
                        {c.isActive ? "Active (Click to pause)" : "Paused (Click to activate)"}
                      </button>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {c.expiresAt
                        ? new Date(c.expiresAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Never expires"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(c.id, c.code)}
                        disabled={isPending}
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CouponFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
}
