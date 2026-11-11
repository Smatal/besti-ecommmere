'use client';

import React, { useState } from 'react';
import { useCart } from '@/frontend/context/CartContext';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    openCheckout,
    subtotal,
    discountAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateItemQty,
    removeItem,
    shippingProgressPct,
    shippingMsg,
    freebieTierText,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      if (applyCoupon(couponInput)) {
        setCouponInput('');
      }
    }
  };

  const handleQuickApply = (code: string) => {
    applyCoupon(code);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="drawer-backdrop active"
        id="drawerBackdrop"
        onClick={closeCart}
      ></div>

      <aside className="cart-drawer active" id="cartDrawer" aria-label="Shopping Cart">
        <div className="drawer-header">
          <h3 className="drawer-title">
            <span>Shopping Cart</span>
          </h3>
          <button
            className="drawer-close-btn"
            onClick={closeCart}
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {/* Free Delivery Milestone Progress Bar */}
        <div className="shipping-progress-banner">
          <div
            className="progress-label"
            id="shippingMsgText"
            dangerouslySetInnerHTML={{ __html: shippingMsg }}
          ></div>
          <div className="progress-track">
            <div
              className="progress-fill"
              id="shippingProgressFill"
              style={{ width: `${shippingProgressPct}%` }}
            ></div>
          </div>
          <div id="cartFreebieTierPill" className="freebie-tier-pill">
            {freebieTierText}
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-body" id="cartDrawerItems">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">💛</div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                Your cart is feeling light
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Explore our clinical sunscreen, glow serums, and hair care routines.
              </p>
              <button
                className="btn btn-gold"
                onClick={() => {
                  closeCart();
                  document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Exploring Products
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${item.packType || 'single'}-${idx}`}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <span className="cart-item-pack">{item.packLabel}</span>
                  <div className="cart-qty-control">
                    <button className="qty-btn" onClick={() => updateItemQty(idx, -1)}>
                      −
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateItemQty(idx, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price-col">
                  <div className="cart-item-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeItem(idx)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon Code Box */}
        {cart.length > 0 && (
          <div className="cart-coupon-box">
            {appliedCoupon ? (
              <div
                id="couponActiveBadge"
                className="coupon-active-badge"
                style={{ display: 'flex' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎉</span>
                  <span style={{ fontWeight: 700, color: '#166534', fontSize: '0.82rem' }}>
                    {appliedCoupon.code} ({appliedCoupon.pct}% OFF Applied)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  style={{
                    fontSize: '0.75rem',
                    color: '#dc2626',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="coupon-input-row" id="couponInputRow">
                <input
                  type="text"
                  placeholder="Enter coupon code (e.g. BESTIE10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-outline"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  Apply
                </button>
              </form>
            )}

            <div className="coupon-chips">
              <span className="coupon-chip" onClick={() => handleQuickApply('BESTIE10')}>
                🏷️ BESTIE10 (10% OFF)
              </span>
              <span className="coupon-chip" onClick={() => handleQuickApply('DIWALI20')}>
                ✨ DIWALI20 (20% OFF)
              </span>
            </div>
          </div>
        )}

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-subtotal-row">
              <span>Items Subtotal:</span>
              <strong id="cartSubtotal">₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>

            {discountAmount > 0 && (
              <div className="cart-subtotal-row discount-row" style={{ display: 'flex' }}>
                <span style={{ color: '#166534', fontWeight: 600 }}>Coupon Discount:</span>
                <strong style={{ color: '#166534' }}>
                  -₹{discountAmount.toLocaleString('en-IN')}
                </strong>
              </div>
            )}

            <div className="cart-subtotal-row final-total-row">
              <span>Total Payable:</span>
              <strong id="cartFinalTotal">₹{finalTotal.toLocaleString('en-IN')}</strong>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Tax included • Free Shipping on orders above ₹499
            </div>

            <button className="checkout-btn" onClick={openCheckout}>
              <span>Proceed to Instant 1-Click Checkout</span>
              <span>⚡</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

