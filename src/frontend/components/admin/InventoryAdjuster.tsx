"use client";

import { useState, useTransition } from "react";
import { adminAdjustStock } from "@/backend/actions/admin/inventory.actions";
import { Plus, Minus, Edit3, X } from "lucide-react";

interface InventoryAdjusterProps {
  productId: string;
  currentStock: number;
  lowStockThreshold: number;
}

export function InventoryAdjuster({
  productId,
  currentStock,
  lowStockThreshold,
}: InventoryAdjusterProps) {
  const [stock, setStock] = useState(currentStock);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customDelta, setCustomDelta] = useState("");
  const [reason, setReason] = useState("Restock batch");
  const [isPending, startTransition] = useTransition();

  const handleQuickAdjust = (delta: number) => {
    startTransition(async () => {
      const res = await adminAdjustStock(productId, delta, "Quick adjustment");
      if (res.success && res.item) {
        setStock(res.item.availableStock);
      } else {
        alert(res.error || "Failed to adjust stock");
      }
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deltaNum = parseInt(customDelta, 10);
    if (isNaN(deltaNum) || deltaNum === 0) return;

    startTransition(async () => {
      const res = await adminAdjustStock(productId, deltaNum, reason);
      if (res.success && res.item) {
        setStock(res.item.availableStock);
        setIsModalOpen(false);
        setCustomDelta("");
      } else {
        alert(res.error || "Failed to adjust stock");
      }
    });
  };

  const isLow = stock <= lowStockThreshold && stock > 0;
  const isOut = stock <= 0;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          className={`admin-badge ${
            isOut
              ? "admin-badge-danger"
              : isLow
              ? "admin-badge-warning"
              : "admin-badge-success"
          }`}
          style={{ minWidth: "50px", justifyContent: "center" }}
        >
          {stock} units
        </span>

        <div style={{ display: "flex", gap: "2px" }}>
          <button
            type="button"
            className="admin-btn admin-btn-outline admin-btn-sm"
            style={{ width: "26px", padding: 0 }}
            onClick={() => handleQuickAdjust(-1)}
            disabled={isPending || stock <= 0}
            title="Decrease by 1"
          >
            <Minus size={12} />
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-outline admin-btn-sm"
            style={{ width: "26px", padding: 0 }}
            onClick={() => handleQuickAdjust(5)}
            disabled={isPending}
            title="Increase by 5"
          >
            <Plus size={12} />
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-outline admin-btn-sm"
            style={{ width: "26px", padding: 0 }}
            onClick={() => setIsModalOpen(true)}
            title="Custom Adjustment"
          >
            <Edit3 size={12} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <div className="admin-modal-title">Adjust Stock: {productId}</div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ cursor: "pointer", color: "#64748b" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCustomSubmit}>
              <div className="admin-modal-body">
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Current Stock
                  </label>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f766e" }}>
                    {stock} units
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Stock Delta (+/- amount)
                  </label>
                  <input
                    type="number"
                    className="admin-input"
                    placeholder="e.g. +50 or -10"
                    value={customDelta}
                    onChange={(e) => setCustomDelta(e.target.value)}
                    required
                    disabled={isPending}
                  />
                  <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                    Use negative numbers to deduct (e.g. -15 for write-offs).
                  </span>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Reason / Audit Note
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Warehouse restock, Damaged goods"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={isPending || !customDelta}
                >
                  {isPending ? "Updating Neon DB..." : "Save Stock Change"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

