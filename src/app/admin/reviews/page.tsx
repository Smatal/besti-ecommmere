import { adminGetReviews } from "@/backend/actions/admin/review.actions";
import { ReviewsTableClient } from "@/frontend/components/admin/ReviewsTableClient";

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviews = await adminGetReviews();

  return <ReviewsTableClient reviews={reviews} />;
}
