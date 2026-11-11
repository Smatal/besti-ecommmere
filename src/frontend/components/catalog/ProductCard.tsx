'use client';

import React from 'react';
import { Product } from '@/shared/types/product';
import { useCart } from '@/frontend/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openPdp, addToCart, selectedPack, setSelectedPackForProduct } = useCart();

  const chosenPack = selectedPack[product.id] || 'single';
  const isDuo = chosenPack === 'duo';
  const currentPrice = isDuo ? product.duoPrice : product.singlePrice;
  const currentMrp = isDuo ? product.duoMrp : product.singleMrp;
  const discountPct = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  return (
    <article className="product-card" data-id={product.id}>
      <div
        className="card-media-wrapper"
        onClick={() => openPdp(product.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className="badge-corner">
          <span className={`badge-pill ${product.badgeType}`}>{product.badge}</span>
          <span className="badge-pill badge-save">SAVE {discountPct}%</span>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        <button
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            openPdp(product.id);
          }}
        >
          View Formulation Details →
        </button>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-volume">{product.volume}</span>
          <span className="card-rating">
            ★ {product.rating}{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
              ({product.reviewsCount})
            </span>
          </span>
        </div>

        <h3
          className="card-title"
          onClick={() => openPdp(product.id)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>

        <div className="card-benefit-tags">
          {product.highlights.slice(0, 3).map((h, i) => (
            <span className="benefit-micro-tag" key={i}>
              {h}
            </span>
          ))}
        </div>

        {/* Pack Toggle Selector */}
        <div className="pack-toggle-selector">
          <button
            type="button"
            className={`pack-toggle-btn ${!isDuo ? 'active' : ''}`}
            onClick={() => setSelectedPackForProduct(product.id, 'single')}
          >
            1 Unit • ₹{product.singlePrice}
          </button>
          <button
            type="button"
            className={`pack-toggle-btn ${isDuo ? 'active' : ''}`}
            onClick={() => setSelectedPackForProduct(product.id, 'duo')}
          >
            Pack of 2 • ₹{product.duoPrice}{' '}
            <span style={{ color: '#166534', fontSize: '0.65rem' }}>(-20%)</span>
          </button>
        </div>

        <div className="card-pricing-row">
          <span className="current-price">₹{currentPrice}</span>
          <span className="original-price">₹{currentMrp}</span>
          <span className="discount-pill">{discountPct}% OFF</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
          <button
            className="card-cta-btn"
            onClick={() => addToCart(product.id, chosenPack)}
          >
            <span>Add to Cart</span>
            <span>•</span>
            <span>₹{currentPrice}</span>
          </button>
          <button
            className="icon-btn"
            style={{ border: '1px solid var(--border-medium)' }}
            onClick={() => openPdp(product.id)}
            title="View Full Specs"
          >
            👁️
          </button>
        </div>
      </div>
    </article>
  );
}

