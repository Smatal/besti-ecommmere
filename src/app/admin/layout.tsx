import { AdminLayoutClient } from "@/frontend/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Bestie Cares Admin Portal",
  description: "Clinical Storefront and Inventory Management System",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
