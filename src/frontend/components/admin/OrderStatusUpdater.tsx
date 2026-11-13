"use client";

import { useState, useTransition } from "react";
import { adminUpdateOrderStatus } from "@/backend/actions/admin/order.actions";
import { OrderStatus } from "@prisma/client";

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

const STATUS_BADGE_CLASS: Record<OrderStatus, string> = {
  PENDING: "admin-badge-warning",
  CONFIRMED: "admin-badge-info",
  PROCESSING: "admin-badge-info",
  SHIPPED: "admin-badge-slate",
  DELIVERED: "admin-badge-success",
  CANCELLED: "admin-badge-danger",
};

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const allowedTransitions = STATUS_TRANSITIONS[status] || [];

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (!confirm(`Transition order ${orderId} to ${newStatus}?`)) return;

    startTransition(async () => {
      const res = await adminUpdateOrderStatus(orderId, newStatus);
      if (res.success && res.order) {
        setStatus(res.order.status);
      } else {
        alert(res.error || "Failed to update order status");
      }
    });
  };

  if (allowedTransitions.length === 0) {
    return (
      <span className={`admin-badge ${STATUS_BADGE_CLASS[status]}`}>
        {status}
      </span>
    );
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span className={`admin-badge ${STATUS_BADGE_CLASS[status]}`}>
        {status}
      </span>
      <select
        className="admin-select"
        style={{ height: "28px", padding: "0 6px", fontSize: "0.75rem", borderRadius: "6px" }}
        disabled={isPending}
        value=""
        onChange={(e) => {
          if (e.target.value) handleStatusChange(e.target.value as OrderStatus);
        }}
      >
        <option value="" disabled>
          {isPending ? "Updating..." : "Action..."}
        </option>
        {allowedTransitions.map((next) => (
          <option key={next} value={next}>
            → Mark as {next}
          </option>
        ))}
      </select>
    </div>
  );
}

