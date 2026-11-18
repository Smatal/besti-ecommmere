"use client";

import { useState, useMemo, Fragment } from "react";
import { OrderStatusUpdater } from "./OrderStatusUpdater";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { Search, ChevronDown, ChevronUp, Package, MapPin, CreditCard } from "lucide-react";

export interface OrderWithDetails {
  id: string;
  customerId: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date | string;
  customer: {
    name: string;
    phone: string;
    email: string | null;
  };
  address: {
    recipientName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    postalCode: string;
  };
  items: {
    id: string;
    productId: string;
    productName: string;
    packType: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  payment: {
    status: PaymentStatus;
    method: PaymentMethod;
    razorpayPaymentId: string | null;
  } | null;
}

export function OrdersTableClient({ orders }: { orders: OrderWithDetails[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.customer.name.toLowerCase().includes(q) ||
        order.customer.phone.includes(q) ||
        (order.couponCode && order.couponCode.toLowerCase().includes(q));

      // Status
      const matchStatus = statusFilter === "all" || order.status === statusFilter;

      // Payment
      const matchPayment = paymentFilter === "all" || order.paymentMethod === paymentFilter;

      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const toggleExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            className="admin-input"
            style={{ paddingLeft: "36px" }}
            placeholder="Search by Order ID, Customer name or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Order Statuses</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <select
          className="admin-select"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="all">All Payment Methods</option>
          <option value="UPI">UPI</option>
          <option value="CARD">CARD</option>
          <option value="COD">Cash on Delivery (COD)</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "36px", textAlign: "center", padding: "12px 6px" }}></th>
                <th style={{ width: "110px", whiteSpace: "nowrap" }}>Order ID</th>
                <th style={{ minWidth: "140px" }}>Customer</th>
                <th style={{ width: "95px", whiteSpace: "nowrap" }}>Total</th>
                <th style={{ width: "125px", whiteSpace: "nowrap" }}>Payment</th>
                <th style={{ minWidth: "195px", whiteSpace: "nowrap" }}>Status Transition</th>
                <th style={{ width: "75px", textAlign: "center", whiteSpace: "nowrap" }}>Items</th>
                <th style={{ width: "125px", whiteSpace: "nowrap" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const dateObj = new Date(order.createdAt);
                  const dateFormatted = dateObj.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const timeFormatted = dateObj.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <Fragment key={order.id}>
                      <tr
                        style={{
                          borderBottom: isExpanded ? "none" : "1px solid #e2e8f0",
                          backgroundColor: isExpanded ? "#f8fafc" : undefined,
                        }}
                      >
                        <td style={{ textAlign: "center", width: "36px", padding: "14px 6px" }}>
                          <button
                            type="button"
                            onClick={() => toggleExpand(order.id)}
                            aria-label={isExpanded ? "Collapse order details" : "Expand order details"}
                            style={{
                              cursor: "pointer",
                              color: isExpanded ? "#0f766e" : "#64748b",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                              borderRadius: "4px",
                              border: "none",
                              background: "transparent",
                            }}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </td>
                        <td style={{ fontWeight: 700, color: "#0f766e", whiteSpace: "nowrap" }}>
                          {order.id}
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                            {order.customer.phone}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                          {order.discountAmount > 0 && (
                            <div style={{ fontSize: "0.72rem", color: "#15803d", fontWeight: 500 }}>
                              Save ₹{order.discountAmount} ({order.couponCode})
                            </div>
                          )}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <span className="admin-badge admin-badge-slate">
                              {order.paymentMethod}
                            </span>
                            <span
                              className={`admin-badge ${
                                order.paymentStatus === "PAID"
                                  ? "admin-badge-success"
                                  : "admin-badge-warning"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td>
                          <OrderStatusUpdater
                            orderId={order.id}
                            currentStatus={order.status}
                          />
                        </td>
                        <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                          <span className="admin-badge admin-badge-slate">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} units
                          </span>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                            {dateFormatted}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                            {timeFormatted}
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Order Details Row */}
                      {isExpanded && (
                        <tr key={`${order.id}-details`}>
                          <td colSpan={8} style={{ backgroundColor: "#f8fafc", padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "20px",
                              }}
                            >
                              {/* Order Items */}
                              <div>
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "#475569",
                                    marginBottom: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  <Package size={14} color="#0f766e" />
                                  <span>Ordered Formulations</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                  {order.items.map((item) => (
                                    <div
                                      key={item.id}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "0.82rem",
                                        padding: "6px 8px",
                                        backgroundColor: "#ffffff",
                                        borderRadius: "6px",
                                        border: "1px solid #e2e8f0",
                                      }}
                                    >
                                      <div>
                                        <span style={{ fontWeight: 600 }}>{item.productName}</span>{" "}
                                        <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                                          ({item.packType}) x{item.quantity}
                                        </span>
                                      </div>
                                      <div style={{ fontWeight: 700 }}>₹{item.totalPrice}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div>
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "#475569",
                                    marginBottom: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  <MapPin size={14} color="#0f766e" />
                                  <span>Delivery Destination</span>
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.82rem",
                                    lineHeight: 1.5,
                                    backgroundColor: "#ffffff",
                                    padding: "10px",
                                    borderRadius: "6px",
                                    border: "1px solid #e2e8f0",
                                  }}
                                >
                                  <div style={{ fontWeight: 600 }}>{order.address.recipientName}</div>
                                  <div>{order.address.addressLine1}</div>
                                  {order.address.addressLine2 && <div>{order.address.addressLine2}</div>}
                                  <div>
                                    {order.address.city}, {order.address.state || ""}{" "}
                                    {order.address.postalCode}
                                  </div>
                                  <div style={{ color: "#64748b" }}>Phone: {order.address.phoneNumber}</div>
                                </div>
                              </div>

                              {/* Payment & Breakdown */}
                              <div>
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "#475569",
                                    marginBottom: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  <CreditCard size={14} color="#0f766e" />
                                  <span>Financial Audit</span>
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.82rem",
                                    lineHeight: 1.6,
                                    backgroundColor: "#ffffff",
                                    padding: "10px",
                                    borderRadius: "6px",
                                    border: "1px solid #e2e8f0",
                                  }}
                                >
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Subtotal:</span>
                                    <span>₹{order.subtotal}</span>
                                  </div>
                                  {order.discountAmount > 0 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        color: "#15803d",
                                      }}
                                    >
                                      <span>Coupon ({order.couponCode}):</span>
                                      <span>-₹{order.discountAmount}</span>
                                    </div>
                                  )}
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Shipping:</span>
                                    <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontWeight: 800,
                                      borderTop: "1px dashed #cbd5e1",
                                      paddingTop: "4px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    <span>Total:</span>
                                    <span>₹{order.totalAmount}</span>
                                  </div>
                                  {order.payment?.razorpayPaymentId && (
                                    <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "6px" }}>
                                      Razorpay ID: {order.payment.razorpayPaymentId}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

