"use client";

import { useState, useMemo } from "react";
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
                <th style={{ width: "32px" }}></th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status Transition</th>
                <th>Items</th>
                <th>Created</th>
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
                  const dateStr = new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tbody key={order.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <tr>
                        <td>
                          <button
                            type="button"
                            onClick={() => toggleExpand(order.id)}
                            style={{
                              cursor: "pointer",
                              color: "#64748b",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </td>
                        <td style={{ fontWeight: 700, color: "#0f766e" }}>{order.id}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                            {order.customer.phone}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                          {order.discountAmount > 0 && (
                            <div style={{ fontSize: "0.72rem", color: "#15803d" }}>
                              Save ₹{order.discountAmount} ({order.couponCode})
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="admin-badge admin-badge-slate">
                            {order.paymentMethod}
                          </span>
                          <span
                            className={`admin-badge ${
                              order.paymentStatus === "PAID"
                                ? "admin-badge-success"
                                : "admin-badge-warning"
                            }`}
                            style={{ marginLeft: "4px" }}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <OrderStatusUpdater
                            orderId={order.id}
                            currentStatus={order.status}
                          />
                        </td>
                        <td>
                          <span className="admin-badge admin-badge-slate">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} units
                          </span>
                        </td>
                        <td style={{ fontSize: "0.78rem", color: "#64748b" }}>{dateStr}</td>
                      </tr>

                      {/* Expandable Order Details Row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} style={{ backgroundColor: "#f8fafc", padding: "16px 24px" }}>
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
                    </tbody>
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
