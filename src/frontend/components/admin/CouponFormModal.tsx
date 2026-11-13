"use client";

import { useState, useTransition } from "react";
import { adminCreateCoupon } from "@/backend/actions/admin/coupon.actions";
import { X, Tag } from "lucide-react";

interface CouponFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CouponFormModal({ isOpen, onClose, onSuccess }: CouponFormModalProps) {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("0");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const val = Number(discountValue);
      const res = await adminCreateCoupon({
        code: code.trim().toUpperCase(),
        discountPercent: discountType === "percent" ? val : null,
        flatDiscount: discountType === "flat" ? val : null,
        minOrderValue: Number(minOrderValue) || 0,
        maxDiscount: maxDiscount ? Number(maxDiscount) : null,
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      });

      if (res.success) {
        onSuccess?.();
        onClose();
      } else {
        alert(res.error || "Failed to create coupon");
      }
    });
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <div className="admin-modal-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Tag size={18} color="#0f766e" />
            <span>Create Promotional Coupon</span>
          </div>
          <button type="button" onClick={onClose} style={{ cursor: "pointer", color: "#64748b" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Coupon Code* (e.g. CLINICAL20)
              </label>
              <input
                type="text"
                className="admin-input"
                style={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="PROMOCODE"
                required
                disabled={isPending}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Discount Type
                </label>
                <select
                  className="admin-select"
                  style={{ width: "100%" }}
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  disabled={isPending}
                >
                  <option value="percent">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Value* ({discountType === "percent" ? "% off" : "₹ off"})
                </label>
                <input
                  type="number"
                  className="admin-input"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "percent" ? "20" : "150"}
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Min Order Value (₹)
                </label>
                <input
                  type="number"
                  className="admin-input"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  placeholder="0"
                  disabled={isPending}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Max Discount Cap (₹)
                </label>
                <input
                  type="number"
                  className="admin-input"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  placeholder="Optional limit"
                  disabled={isPending}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Max Redemptions
                </label>
                <input
                  type="number"
                  className="admin-input"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Unlimited if empty"
                  disabled={isPending}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Expiration Date
                </label>
                <input
                  type="date"
                  className="admin-input"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isPending}>
              {isPending ? "Creating..." : "Save Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
