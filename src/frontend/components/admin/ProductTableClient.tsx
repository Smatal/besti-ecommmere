"use client";

import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { AdminProductView, adminDeleteProduct, adminBulkDeleteProducts, adminBulkUpdateCategory } from "@/backend/actions/admin/product.actions";
import { AdminTableToolbar } from "./AdminTableToolbar";
import { QuickEditProductModal } from "./QuickEditProductModal";
import {
  Package,
  Edit2,
  Trash2,
  Layers,
  CheckSquare,
  Square,
  AlertTriangle,
  Upload,
  Plus,
} from "lucide-react";

export function ProductTableClient({ products }: { products: AdminProductView[] }) {
  const [productList, setProductList] = useState(products);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<AdminProductView | null>(null);
  const [isBulkCategoryOpen, setIsBulkCategoryOpen] = useState(false);
  const [newBulkCategory, setNewBulkCategory] = useState("");
  const [isPending, startTransition] = useTransition();

  // Extract unique category names
  const categories = useMemo(() => {
    return Array.from(new Set(productList.map((p) => p.categoryName || p.category))).filter(Boolean);
  }, [productList]);

  // Filtered & Sorted
  const filteredProducts = useMemo(() => {
    let result = [...productList];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.categoryName === selectedCategory || p.category === selectedCategory
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.singlePrice - b.singlePrice;
        case "price-desc":
          return b.singlePrice - a.singlePrice;
        case "stock-asc":
          return (a.stock || 0) - (b.stock || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [productList, search, selectedCategory, sortBy]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (docId: string, id: string) => {
    if (!confirm(`Are you sure you want to delete ${id}? This deletes from Sanity and Neon DB.`)) return;

    startTransition(async () => {
      const res = await adminDeleteProduct(docId, id);
      if (res.success) {
        setProductList((prev) => prev.filter((p) => p._id !== docId));
        setSelectedIds((prev) => prev.filter((i) => i !== docId));
      } else {
        alert(res.error || "Failed to delete product");
      }
    });
  };

  const handleBulkDelete = () => {
    if (!confirm(`Permanently delete ${selectedIds.length} products from Sanity CMS?`)) return;

    startTransition(async () => {
      const res = await adminBulkDeleteProducts(selectedIds);
      if (res.success) {
        setProductList((prev) => prev.filter((p) => !selectedIds.includes(p._id)));
        setSelectedIds([]);
      } else {
        alert(res.error || "Failed to bulk delete");
      }
    });
  };

  const handleBulkCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBulkCategory.trim()) return;

    startTransition(async () => {
      const res = await adminBulkUpdateCategory(selectedIds, newBulkCategory.trim());
      if (res.success) {
        setProductList((prev) =>
          prev.map((p) =>
            selectedIds.includes(p._id)
              ? { ...p, categoryName: newBulkCategory.trim() }
              : p
          )
        );
        setIsBulkCategoryOpen(false);
        setSelectedIds([]);
        setNewBulkCategory("");
      } else {
        alert(res.error || "Failed to bulk update category");
      }
    });
  };

  return (
    <div>
      {/* Top Header Action Row */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Catalog Formulations</h1>
          <p className="admin-page-subtitle">
            Synchronized directly with Sanity CMS dataset "production" and Neon DB.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link href="/admin/products/import" className="admin-btn admin-btn-outline">
            <Upload size={16} />
            <span>Bulk Import (Excel)</span>
          </Link>
          <Link href="/admin/studio" className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>New Sanity Product</span>
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <AdminTableToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOptions={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "price-asc", label: "Price (Low → High)" },
          { value: "price-desc", label: "Price (High → Low)" },
          { value: "stock-asc", label: "Stock (Low first)" },
        ]}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "10px 16px",
            borderRadius: "8px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {selectedIds.length} formulation{selectedIds.length > 1 ? "s" : ""} selected
          </span>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="admin-btn admin-btn-sm admin-btn-outline"
              style={{ backgroundColor: "#1e293b", color: "#fff", borderColor: "#334155" }}
              onClick={() => setIsBulkCategoryOpen(true)}
              disabled={isPending}
            >
              Update Category
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-sm admin-btn-danger"
              onClick={handleBulkDelete}
              disabled={isPending}
            >
              <Trash2 size={12} />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" ? (
        <div className="admin-card">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "32px" }}>
                    <input
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        selectedIds.length === filteredProducts.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Selling Price</th>
                  <th>MRP</th>
                  <th>Stock Status</th>
                  <th>Badge</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isSelected = selectedIds.includes(p._id);
                    const isLow = (p.stock || 0) <= (p.lowStockThreshold || 15) && (p.stock || 0) > 0;
                    const isOut = (p.stock || 0) <= 0;

                    return (
                      <tr key={p._id} style={{ backgroundColor: isSelected ? "#f1f5f9" : undefined }}>
                        <td>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(p._id)}
                          />
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img
                              src={p.image}
                              alt={p.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "6px",
                                objectFit: "cover",
                                border: "1px solid #e2e8f0",
                              }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: "#0f172a" }}>{p.name}</div>
                              <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                                SKU: {p.id} • {p.volume || "50ml"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="admin-badge admin-badge-slate">{p.categoryName}</span>
                        </td>
                        <td style={{ fontWeight: 700 }}>₹{p.singlePrice}</td>
                        <td style={{ color: "#94a3b8", textDecoration: "line-through" }}>
                          ₹{p.singleMrp}
                        </td>
                        <td>
                          <span
                            className={`admin-badge ${
                              isOut
                                ? "admin-badge-danger"
                                : isLow
                                ? "admin-badge-warning"
                                : "admin-badge-success"
                            }`}
                          >
                            {p.stock} in stock
                          </span>
                        </td>
                        <td>
                          {p.badge ? (
                            <span
                              className="admin-badge"
                              style={{
                                backgroundColor: "#fef3c7",
                                color: "#b45309",
                                fontWeight: 800,
                              }}
                            >
                              {p.badge}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "4px" }}>
                            <button
                              type="button"
                              className="admin-btn admin-btn-outline admin-btn-sm"
                              onClick={() => setEditingProduct(p)}
                              title="Quick Edit"
                            >
                              <Edit2 size={12} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="admin-btn admin-btn-danger admin-btn-sm"
                              onClick={() => handleDelete(p._id, p.id)}
                              disabled={isPending}
                              title="Delete Product"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="admin-product-grid">
          {filteredProducts.map((p) => {
            const isSelected = selectedIds.includes(p._id);
            const isLow = (p.stock || 0) <= (p.lowStockThreshold || 15) && (p.stock || 0) > 0;
            const isOut = (p.stock || 0) <= 0;

            return (
              <div
                key={p._id}
                className="admin-product-card"
                style={{
                  borderColor: isSelected ? "#0f766e" : undefined,
                  boxShadow: isSelected ? "0 0 0 2px #0f766e" : undefined,
                }}
              >
                <div style={{ position: "relative" }}>
                  <img src={p.image} alt={p.name} className="admin-product-card-img" />
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderRadius: "4px",
                      padding: "2px 6px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectOne(p._id)}
                    />
                  </div>
                  {p.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                      }}
                    >
                      <span className="admin-badge admin-badge-warning">{p.badge}</span>
                    </div>
                  )}
                </div>

                <div className="admin-product-card-body">
                  <div style={{ fontSize: "0.72rem", color: "#0f766e", fontWeight: 700 }}>
                    {p.categoryName}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.3 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    SKU: {p.id} • {p.volume || "50ml"}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "auto",
                      paddingTop: "12px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>₹{p.singlePrice}</span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#94a3b8",
                          textDecoration: "line-through",
                          marginLeft: "6px",
                        }}
                      >
                        ₹{p.singleMrp}
                      </span>
                    </div>
                    <span
                      className={`admin-badge ${
                        isOut
                          ? "admin-badge-danger"
                          : isLow
                          ? "admin-badge-warning"
                          : "admin-badge-success"
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "6px",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      type="button"
                      className="admin-btn admin-btn-outline admin-btn-sm"
                      onClick={() => setEditingProduct(p)}
                    >
                      <Edit2 size={12} />
                      <span>Quick Edit</span>
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => handleDelete(p._id, p.id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingProduct && (
        <QuickEditProductModal
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            // Re-sync local state
            setEditingProduct(null);
          }}
        />
      )}

      {/* Bulk Category Modal */}
      {isBulkCategoryOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <div className="admin-modal-title">Bulk Update Category</div>
            </div>
            <form onSubmit={handleBulkCategorySubmit}>
              <div className="admin-modal-body">
                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Assigning a new category to {selectedIds.length} selected products in Sanity CMS.
                </p>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Cleansers & Face Washes"
                    value={newBulkCategory}
                    onChange={(e) => setNewBulkCategory(e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setIsBulkCategoryOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={isPending || !newBulkCategory.trim()}
                >
                  {isPending ? "Updating Sanity..." : "Apply Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
