"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import "./admin.css";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="admin-wrapper">
      <AdminSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="admin-main-container">
        <AdminTopBar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
