"use client";

import { useState, useTransition } from "react";
import { adminUpdateReturnStatus } from "@/backend/actions/admin/return.actions";
import { ReturnStatus } from "@prisma/client";

interface ReturnStatusUpdaterProps {
  returnId: string;
  currentStatus: ReturnStatus;
}

const RETURN_STATUS_BADGE: Record<ReturnStatus, string> = {
  REQUESTED: "admin-badge-warning",
  APPROVED: "admin-badge-info",
  RECEIVED: "admin-badge-slate",
  REFUNDED: "admin-badge-success",
  REJECTED: "admin-badge-danger",
};

export function ReturnStatusUpdater({ returnId, currentStatus }: ReturnStatusUpdaterProps) {
  const [status, setStatus] = useState<ReturnStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatus: ReturnStatus) => {
    if (!confirm(`Update return request ${returnId} to ${newStatus}?`)) return;

    startTransition(async () => {
      const res = await adminUpdateReturnStatus(returnId, newStatus);
      if (res.success && res.returnRequest) {
        setStatus(res.returnRequest.status);
      } else {
        alert(res.error || "Failed to update return status");
      }
    });
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span className={`admin-badge ${RETURN_STATUS_BADGE[status]}`}>
        {status}
      </span>
      <select
        className="admin-select"
        style={{ height: "28px", padding: "0 6px", fontSize: "0.75rem", borderRadius: "6px" }}
        disabled={isPending}
        value={status}
        onChange={(e) => handleChange(e.target.value as ReturnStatus)}
      >
        <option value="REQUESTED">REQUESTED</option>
        <option value="APPROVED">APPROVED</option>
        <option value="RECEIVED">RECEIVED</option>
        <option value="REFUNDED">REFUNDED</option>
        <option value="REJECTED">REJECTED</option>
      </select>
    </div>
  );
}

