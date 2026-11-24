"use client";

import { useState, useEffect, useTransition } from "react";
import { adminQuickEditProduct, AdminProductView } from "@/backend/actions/admin/product.actions";
import { X, Check } from "lucide-react";

interface QuickEditProductModalProps {
  product: AdminProductView;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function QuickEditProductModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: QuickEditProductModalProps) {
  const [name, setName] = useState(product.name || "");
  const [singlePrice, setSinglePrice] = useState(String(product.singlePrice || 0));
  const [singleMrp, setSingleMrp] = useState(String(product.singleMrp || 0));
  const [categoryName, setCategoryName] = useState(product.categoryName || "");
  const [subtitle, setSubtitle] = useState(product.subtitle || "");
  const [description, setDescription] = useState(product.description || "");
  const [badge, setBadge] = useState(product.badge || "");
  const [badgeType, setBadgeType] = useState(product.badgeType || "badge-gold");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isPending) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPending, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await adminQuickEditProduct(product._id, {
        name,
        singlePrice: Number(singlePrice),
        singleMrp: Number(singleMrp),
        categoryName,
        subtitle,
        description,
        badge,
        badgeType,
      });

      if (res.success) {
        onSuccess?.();
        onClose();
      } else {
        alert(res.error || "Failed to update product");
      }
    });
  };

  return (
    <div
      className="admin-modal-overlay"
      onClick={(e) => {
        if (!isPending && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <div className="admin-modal-title">Quick Edit: {product.name}</div>
          <button type="button" onClick={onClose} style={{ cursor: "pointer", color: "#64748b" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Product Name
              </label>
              <input
                type="text"
                className="admin-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Selling Price (INR)
                </label>
                <input
                  type="number"
                  className="admin-input"
                  value={singlePrice}
                  onChange={(e) => setSinglePrice(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  MRP (INR)
                </label>
                <input
                  type="number"
                  className="admin-input"
                  value={singleMrp}
                  onChange={(e) => setSingleMrp(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Category
              </label>
              <input
                type="text"
                className="admin-input"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                disabled={isPending}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Badge Text (e.g. SALON GLOSS)
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. SALON GLOSS"
                  disabled={isPending}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                  Badge Style / Color
                </label>
                <select
                  className="admin-input"
                  value={badgeType}
                  onChange={(e) => setBadgeType(e.target.value)}
                  disabled={isPending}
                >
                  <option value="badge-gold">Gold (Luxury / Elixir)</option>
                  <option value="badge-glow">Blue / Cyan (Salon / Gloss / Hydro)</option>
                  <option value="badge-wine">Wine / Rose (Berry / Potent)</option>
                  <option value="badge-new">Teal (Clinical / Fresh)</option>
                  <option value="badge-derma">Black &amp; Gold (Derma)</option>
                  <option value="badge-save">Red (Save / Sale)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Clinical Subtitle
              </label>
              <input
                type="text"
                className="admin-input"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                disabled={isPending}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Clinical Product Description (PDP)
              </label>
              <textarea
                className="admin-input"
                style={{ height: "90px", padding: "8px 12px", resize: "vertical" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPending}
                placeholder="Detailed clinical mechanism of action and skin benefits..."
              />
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
              {isPending ? "Syncing Sanity..." : "Save to Sanity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

