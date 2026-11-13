import { adminGetReturns } from "@/backend/actions/admin/return.actions";
import { ReturnsTableClient } from "@/frontend/components/admin/ReturnsTableClient";

export const revalidate = 0;

export default async function AdminReturnsPage() {
  const returns = await adminGetReturns();

  return <ReturnsTableClient returns={returns} />;
}
