"use client";

import { useState, useTransition } from "react";
import { adminCreateCategory } from "@/backend/actions/admin/category.actions";
import { X, FolderPlus } from "lucide-react";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CategoryFormModal({ isOpen, onClose, onSuccess }: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await adminCreateCategory(name, description);
      if (res.success) {
        onSuccess?.();
        onClose();
      } else {
        alert(res.error || "Failed to create category");
      }
    });
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <div className="admin-modal-header">
          <div className="admin-modal-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FolderPlus size={18} color="#0f766e" />
            <span>Add New Clinical Category</span>
          </div>
          <button type="button" onClick={onClose} style={{ cursor: "pointer", color: "#64748b" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Category Name*
              </label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Suncare & UV Defence"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Description
              </label>
              <textarea
                className="admin-input"
                style={{ height: "80px", padding: "8px 12px", resize: "vertical" }}
                placeholder="Clinical purpose and skin target..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPending}
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
              {isPending ? "Creating..." : "Save to Sanity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
