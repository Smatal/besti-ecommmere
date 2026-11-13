"use client";

import { Search, LayoutGrid, List } from "lucide-react";

export interface SortOption {
  value: string;
  label: string;
}

interface AdminTableToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode?: "list" | "grid";
  onViewModeChange?: (mode: "list" | "grid") => void;
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
  sortOptions?: SortOption[];
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

export function AdminTableToolbar({
  searchQuery,
  onSearchChange,
  viewMode = "list",
  onViewModeChange,
  categories,
  selectedCategory = "all",
  onCategoryChange,
  sortOptions,
  sortBy,
  onSortChange,
}: AdminTableToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
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
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {categories && categories.length > 0 && onCategoryChange && (
          <select
            className="admin-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {sortOptions && sortOptions.length > 0 && onSortChange && (
          <select
            className="admin-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {onViewModeChange && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#e2e8f0",
              borderRadius: "8px",
              padding: "2px",
            }}
          >
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`admin-btn admin-btn-sm ${
                viewMode === "list" ? "admin-btn-primary" : "admin-btn-outline"
              }`}
              style={{ border: "none" }}
              title="List View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`admin-btn admin-btn-sm ${
                viewMode === "grid" ? "admin-btn-primary" : "admin-btn-outline"
              }`}
              style={{ border: "none" }}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

