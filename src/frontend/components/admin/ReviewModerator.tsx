"use client";

import { useState, useTransition } from "react";
import { adminModerateReview } from "@/backend/actions/admin/review.actions";
import { ReviewStatus } from "@prisma/client";
import { Check, X } from "lucide-react";

interface ReviewModeratorProps {
  reviewId: string;
  currentStatus: ReviewStatus;
}

export function ReviewModerator({ reviewId, currentStatus }: ReviewModeratorProps) {
  const [status, setStatus] = useState<ReviewStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleModerate = (newStatus: ReviewStatus) => {
    startTransition(async () => {
      const res = await adminModerateReview(reviewId, newStatus);
      if (res.success && res.review) {
        setStatus(res.review.status);
      } else {
        alert(res.error || "Failed to moderate review");
      }
    });
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span
        className={`admin-badge ${
          status === "APPROVED"
            ? "admin-badge-success"
            : status === "REJECTED"
            ? "admin-badge-danger"
            : "admin-badge-warning"
        }`}
      >
        {status}
      </span>

      {status !== "APPROVED" && (
        <button
          type="button"
          className="admin-btn admin-btn-sm admin-btn-primary"
          style={{ width: "26px", padding: 0 }}
          title="Approve Review"
          onClick={() => handleModerate("APPROVED")}
          disabled={isPending}
        >
          <Check size={12} />
        </button>
      )}

      {status !== "REJECTED" && (
        <button
          type="button"
          className="admin-btn admin-btn-sm admin-btn-danger"
          style={{ width: "26px", padding: 0 }}
          title="Reject Review"
          onClick={() => handleModerate("REJECTED")}
          disabled={isPending}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}

