'use client';

import React, { useState } from 'react';
import { useCatalog } from '@/frontend/context/CatalogContext';
import { useCart } from '@/frontend/context/CartContext';

export function ProductDetailModal() {
  const { products, getProductById } = useCatalog();
  const { activePdpId, closePdp, addToCart, openCheckout, selectedPack, setSelectedPackForProduct } =
    useCart();

  const [activeTab, setActiveTab] = useState<'specs' | 'howTo' | 'inci' | 'comparison'>('specs');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [pincode, setPincode] = useState('');
  const [pincodeFeedback, setPincodeFeedback] = useState<{
    valid: boolean;
    text: string;
  } | null>(null);

  if (!activePdpId) return null;

  const product = getProductById(activePdpId) || products[0];
  if (!product) return null;

  const currentPack = selectedPack[product.id] || 'single';
  const isDuo = currentPack === 'duo';
  const currentPrice = isDuo ? product.duoPrice : product.singlePrice;
  const currentMrp = isDuo ? product.duoMrp : product.singleMrp;
  const discountPct = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  const heroImage = selectedImg || product.image;

  const handleCheckPincode = () => {
    if (/^\d{6}$/.test(pincode.trim())) {
      const today = new Date();
      today.setDate(today.getDate() + 3);
      const dateStr = today.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setPincodeFeedback({
        valid: true,
        text: `✅ Delivery by ${dateStr} to ${pincode} • Cash on Delivery (COD) Available • Free Shipping`,
      });
    } else {
      setPincodeFeedback({
        valid: false,
        text: '❌ Please enter a valid 6-digit Indian PIN code.',
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(product.id, currentPack);
    openCheckout();
  };

  return (
    <div className="pdp-modal active" id="pdpModal" style={{ overflowY: 'auto' }}>
      <div className="pdp-modal-content" style={{ maxWidth: '1100px', padding: '32px' }}>
        <button className="pdp-close-btn" onClick={closePdp}>
          ✕
        </button>

        {/* Breadcrumbs & Back */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              onClick={closePdp}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Home
            </span>
            <span>/</span>
            <span>{product.categoryName}</span>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
          </div>
          <button
            className="btn btn-outline"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            onClick={closePdp}
          >
            ← Back to All Formulations
          </button>
        </div>

        {/* 50/50 Buy Box Grid */}
        <div className="pdp-hero-grid">
          {/* Left: Gallery Media Showcase */}
          <div className="pdp-media-column">
            <div className="pdp-main-image-card">
              <div className="badge-corner">
                <span className={`badge-pill ${product.badgeType}`}>{product.badge}</span>
                <span className="badge-pill" style={{ background: '#0f766e', color: '#fff' }}>
                  DERMATOLOGIST TESTED
                </span>
              </div>
              <img src={heroImage} alt={product.name} className="pdp-hero-image" />
            </div>

            {/* Thumbnails */}
            <div className="pdp-thumbnail-row">
              <div
                className={`thumb-box ${heroImage === product.image ? 'active' : ''}`}
                onClick={() => setSelectedImg(product.image)}
              >
                <img src={product.image} alt="Packshot" />
              </div>
              <div
                className={`thumb-box ${heroImage === '/client_assets/video_thumb.jpg' ? 'active' : ''}`}
                onClick={() => setSelectedImg('/client_assets/video_thumb.jpg')}
              >
                <img src="/client_assets/video_thumb.jpg" alt="Texture Swatch" />
              </div>
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="pdp-buybox-column">
            <div className="pdp-category-tag">Bestie Cares • Clinical Dermatological Care</div>
            <h1 className="pdp-product-title">{product.name}</h1>
            <p className="pdp-product-subtitle">{product.subtitle}</p>

            <div className="pdp-social-proof-line">
              <span className="stars-gold">★★★★★</span>
              <strong>{product.rating} / 5.0</strong>
              <span style={{ color: 'var(--text-muted)' }}>
                ({product.reviewsCount} Verified Reviews)
              </span>
              <span>•</span>
              <span style={{ color: '#166534', fontWeight: 700 }}>
                ✓ In-Vivo ISO 24444 Certified
              </span>
            </div>

            {/* Benefit Pill Cloud */}
            <div className="pdp-benefit-pill-cloud">
              {product.highlights.map((h, i) => (
                <span className="pdp-pill" key={i}>
                  {h}
                </span>
              ))}
            </div>

            {/* Pack Selector Cards */}
            <div className="bundle-selector-card-group">
              <div
                className={`bundle-card ${!isDuo ? 'selected' : ''}`}
                onClick={() => setSelectedPackForProduct(product.id, 'single')}
              >
                <div className="bundle-card-header">
                  <div>
                    <strong>Single Pack</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      {product.volume}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                      }}
                    >
                      ₹{product.singlePrice}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'line-through',
                        display: 'block',
                      }}
                    >
                      ₹{product.singleMrp}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`bundle-card ${isDuo ? 'selected' : ''}`}
                onClick={() => setSelectedPackForProduct(product.id, 'duo')}
              >
                <div className="bundle-card-badge">RECOMMENDED DUO VALUE</div>
                <div className="bundle-card-header">
                  <div>
                    <strong style={{ color: 'var(--gold-dark)' }}>Pack of 2 (Duo Deal)</strong>
                    <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700, display: 'block' }}>
                      SAVE 20% • ₹{Math.round(product.duoPrice / 2)}/each
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                      }}
                    >
                      ₹{product.duoPrice}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'line-through',
                        display: 'block',
                      }}
                    >
                      ₹{product.duoMrp}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <button
                className="btn btn-gold"
                style={{ padding: '16px', fontSize: '1.05rem' }}
                onClick={() => addToCart(product.id, currentPack)}
              >
                Add to Cart — ₹{currentPrice}
              </button>
              <button
                className="btn btn-primary"
                style={{ padding: '14px', fontSize: '0.95rem' }}
                onClick={handleBuyNow}
              >
                Buy Now with Instant 1-Click UPI ⚡
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="pincode-checker-box">
              <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                Check Delivery Time &amp; COD:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 600008)"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  onClick={handleCheckPincode}
                >
                  Check
                </button>
              </div>
              {pincodeFeedback && (
                <div
                  style={{
                    fontSize: '0.78rem',
                    marginTop: '6px',
                    color: pincodeFeedback.valid ? '#166534' : '#dc2626',
                  }}
                >
                  {pincodeFeedback.text}
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="pdp-trust-row" style={{ marginTop: '16px' }}>
              <div>🚚 <strong>Free Shipping</strong> on ₹499+</div>
              <div>🔒 <strong>100% Safe Checkout</strong> via UPI / Cards</div>
              <div>🩺 <strong>Dermatologist Formulated</strong></div>
            </div>
          </div>
        </div>

        {/* Below The Fold: Specifications & Application Guides */}
        <div style={{ marginTop: '50px' }}>
          <div className="pdp-tabs-nav">
            <button
              className={`pdp-tab-trigger ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Clinical Details
            </button>
            <button
              className={`pdp-tab-trigger ${activeTab === 'howTo' ? 'active' : ''}`}
              onClick={() => setActiveTab('howTo')}
            >
              How to Apply
            </button>
            <button
              className={`pdp-tab-trigger ${activeTab === 'inci' ? 'active' : ''}`}
              onClick={() => setActiveTab('inci')}
            >
              Ingredients (INCI)
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="pdp-tab-pane active" style={{ display: 'block' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                  Clinical Actives Overview
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                  {product.description}
                </p>
                <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '8px' }}>
                  <strong>Key Actives:</strong> {product.actives}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'howTo' && (
            <div className="pdp-tab-pane active" style={{ display: 'block' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>
                  Application Protocol:
                </h4>
                <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  {product.howToUse.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'inci' && (
            <div className="pdp-tab-pane active" style={{ display: 'block' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                  Full Active Ingredient Breakdown:
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {product.inci}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

