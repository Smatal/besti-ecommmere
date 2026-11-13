import { adminGetCustomers } from "@/backend/actions/admin/customer.actions";
import { CustomersTableClient } from "@/frontend/components/admin/CustomersTableClient";

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const customers = await adminGetCustomers();

  return <CustomersTableClient customers={customers} />;
}

