"use client";

import Link from "next/link";
import { Search, ExternalLink, Bell, Menu, ShieldCheck } from "lucide-react";

export function AdminTopBar({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  return (
    <header className="admin-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="admin-btn admin-btn-outline admin-btn-sm"
          style={{ display: "inline-flex" }}
          aria-label="Toggle Navigation"
        >
          <Menu size={18} />
        </button>

        <div className="admin-search-wrapper" style={{ display: "none" }}>
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search orders, customers, or SKUs..."
          />
        </div>
      </div>

      <div className="admin-topbar-actions">
        <Link href="/" target="_blank" className="admin-topbar-link">
          <span>View Live Store</span>
          <ExternalLink size={14} />
        </Link>

        <div className="admin-user-pill">
          <div className="admin-avatar">
            <ShieldCheck size={18} />
          </div>
          <div style={{ fontSize: "0.82rem", lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700, color: "#0f172a" }}>Clinical Lead</div>
            <div style={{ color: "#0f766e", fontSize: "0.72rem", fontWeight: 600 }}>Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

