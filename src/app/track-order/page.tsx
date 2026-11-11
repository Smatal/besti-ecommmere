'use client';

import React, { useState } from 'react';
import { trackOrderAction } from '@/backend/actions/checkout.actions';
import { OrderDetail } from '@/shared/types/order.types';
import { AnnouncementBar } from '@/frontend/components/critical/AnnouncementBar';
import { Header } from '@/frontend/components/critical/Header';
import { Footer } from '@/frontend/components/critical/Footer';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    const res = await trackOrderAction(orderId);
    setLoading(false);

    if (res.success && res.data) {
      setOrder(res.data as OrderDetail);
    } else {
      setError(res.error || 'Order not found');
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ minHeight: '65vh', padding: '60px 0', background: 'var(--bg-surface)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-subhead">Live Order Status</span>
            <h1 className="section-title" style={{ fontSize: '2rem' }}>
              Track Your Bestie Cares Order
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Enter your Order ID (e.g. <code>BC-123456</code>) to view tracking, delivery timelines,
              and invoice details.
            </p>
          </div>

          <form
            onSubmit={handleTrack}
            style={{
              background: '#fff',
              padding: '28px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Enter Order ID (e.g. BC-123456)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-medium)',
                  fontSize: '0.95rem',
                }}
                required
              />
              <button
                type="submit"
                className="btn btn-gold"
                disabled={loading}
                style={{ padding: '12px 24px' }}
              >
                {loading ? 'Tracking...' : 'Track →'}
              </button>
            </div>
            {error && (
              <div style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '12px' }}>
                ❌ {error}
              </div>
            )}
          </form>

          {order && (
            <div
              style={{
                background: '#fff',
                padding: '28px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Order #{order.id}</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    background: '#dcfce7',
                    color: '#166534',
                  }}
                >
                  ✓ {order.status}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                  Ordered Items:
                </h4>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.9rem',
                      padding: '8px 0',
                      borderBottom: '1px dashed var(--border-light)',
                    }}
                  >
                    <div>
                      <strong>{item.productName}</strong>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item.packType} × {item.quantity}
                      </span>
                    </div>
                    <span>₹{item.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: 'var(--bg-surface)',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Subtotal:</span>
                  <strong>₹{order.subtotal.toLocaleString('en-IN')}</strong>
                </div>
                {order.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#166534' }}>
                    <span>Coupon Discount:</span>
                    <strong>-₹{order.discountAmount.toLocaleString('en-IN')}</strong>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Delivery Fee:</span>
                  <strong>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '8px',
                    marginTop: '8px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                  }}
                >
                  <span>Total Paid:</span>
                  <span style={{ color: '#166534' }}>₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

