"use client";

import { useState, useTransition } from "react";
import { AdminCategoryItem, adminDeleteCategory } from "@/backend/actions/admin/category.actions";
import { CategoryFormModal } from "./CategoryFormModal";
import { FolderTree, Plus, Trash2, Package } from "lucide-react";

export function CategoriesClient({ categories }: { categories: AdminCategoryItem[] }) {
  const [list, setList] = useState(categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (categoryId: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Existing products will lose their reference.`)) return;

    startTransition(async () => {
      const res = await adminDeleteCategory(categoryId);
      if (res.success) {
        setList((prev) => prev.filter((c) => c._id !== categoryId));
      } else {
        alert(res.error || "Failed to delete category");
      }
    });
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Clinical Categories</h1>
          <p className="admin-page-subtitle">
            Organize formulations across clinical dermatological concerns and routines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="admin-btn admin-btn-primary"
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug / ID</th>
                <th>Description</th>
                <th>Products Count</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No categories found. Click "Add New Category" to create one.
                  </td>
                </tr>
              ) : (
                list.map((cat) => (
                  <tr key={cat._id}>
                    <td style={{ fontWeight: 700, color: "#0f172a" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FolderTree size={16} color="#0f766e" />
                        <span>{cat.name}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#64748b" }}>
                      {cat.slug}
                    </td>
                    <td style={{ color: "#64748b", maxWidth: "340px" }}>
                      {cat.description || <span style={{ color: "#cbd5e1" }}>No description provided</span>}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-slate">
                        {cat.productCount} products
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(cat._id, cat.name)}
                        disabled={isPending}
                        title="Delete category"
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

      <CategoryFormModal
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
