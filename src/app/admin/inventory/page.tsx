import { adminGetInventory } from "@/backend/actions/admin/inventory.actions";
import { InventoryTableClient } from "@/frontend/components/admin/InventoryTableClient";

export const revalidate = 0;

export default async function AdminInventoryPage() {
  const items = await adminGetInventory();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory Stock Warehouse</h1>
          <p className="admin-page-subtitle">
            PostgreSQL-backed stock levels with real-time atomic adjustments and threshold alerts.
          </p>
        </div>
      </div>

      <InventoryTableClient items={items} />
    </div>
  );
}
