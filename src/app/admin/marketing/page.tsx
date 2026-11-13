import { adminGetCoupons } from "@/backend/actions/admin/coupon.actions";
import { CouponsClient } from "@/frontend/components/admin/CouponsClient";

export const revalidate = 0;

export default async function AdminMarketingPage() {
  const coupons = await adminGetCoupons();

  return <CouponsClient coupons={coupons} />;
}
