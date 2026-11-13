"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Upload,
  Layers,
  FolderTree,
  ShoppingCart,
  RotateCcw,
  Users,
  Star,
  Tag,
  Settings,
  ScrollText,
  BarChart3,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
      { label: "Live Storefront", href: "/", icon: <ExternalLink size={18} />, external: true },
    ],
  },
  {
    title: "Catalog & Stock",
    items: [
      { label: "Products", href: "/admin/products", icon: <Package size={18} /> },
      { label: "Excel Bulk Import", href: "/admin/products/import", icon: <Upload size={18} /> },
      { label: "Inventory Levels", href: "/admin/inventory", icon: <Layers size={18} /> },
      { label: "Categories", href: "/admin/categories", icon: <FolderTree size={18} /> },
    ],
  },
  {
    title: "Sales & Orders",
    items: [
      { label: "All Orders", href: "/admin/orders", icon: <ShoppingCart size={18} /> },
      { label: "Returns & Refunds", href: "/admin/returns", icon: <RotateCcw size={18} /> },
    ],
  },
  {
    title: "Customers & Care",
    items: [
      { label: "Customer Directory", href: "/admin/customers", icon: <Users size={18} /> },
      { label: "Reviews Moderation", href: "/admin/reviews", icon: <Star size={18} /> },
    ],
  },
  {
    title: "Growth & Studio",
    items: [
      { label: "Coupons & Marketing", href: "/admin/marketing", icon: <Tag size={18} /> },
      { label: "Sanity Studio", href: "/admin/studio", icon: <Sparkles size={18} /> },
    ],
  },
  {
    title: "System & Config",
    items: [
      { label: "Reports & Analytics", href: "/admin/reports", icon: <BarChart3 size={18} /> },
      { label: "Store Settings", href: "/admin/settings", icon: <Settings size={18} /> },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: <ScrollText size={18} /> },
    ],
  },
];

export function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="admin-sidebar-header">
        <div className="admin-logo-badge">B</div>
        <div>
          <div className="admin-brand-title">Bestie Cares</div>
          <div className="admin-brand-subtitle">Clinical Admin</div>
        </div>
      </div>

      <nav className="admin-nav">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="admin-nav-group-title">{group.title}</div>
            {group.items.map((item) => {
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  onClick={onClose}
                  className={`admin-nav-item ${isActive ? "active" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#0f766e",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            BC
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            <div style={{ fontWeight: 600, color: "#f8fafc" }}>Admin Panel</div>
            <div>v2.0 (Neon + Sanity)</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
