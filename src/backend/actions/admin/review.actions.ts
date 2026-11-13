"use server";

import { prisma } from "@/backend/db/client";
import { ReviewStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function adminGetReviews() {
  try {
    return await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[adminGetReviews] Error:", error);
    return [];
  }
}

export async function adminModerateReview(reviewId: string, status: ReviewStatus) {
  try {
    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: { status },
    });

    await prisma.auditLog.create({
      data: {
        action: "REVIEW_MODERATED",
        entityType: "Review",
        entityId: reviewId,
        summary: `Review for product ${updated.productId} marked as ${status}`,
      },
    });

    revalidatePath("/admin/reviews");
    return { success: true, review: updated };
  } catch (error: any) {
    console.error("[adminModerateReview] Error:", error);
    return { success: false, error: error.message || "Failed to moderate review" };
  }
}

