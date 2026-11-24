'use client';

import React from 'react';
import { Product } from '@/shared/types/product';
import { useCart } from '@/frontend/context/CartContext';
import { Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openPdp, addToCart, selectedPack, setSelectedPackForProduct } = useCart();

  const chosenPack = selectedPack[product.id] || 'single';
  const isDuo = chosenPack === 'duo';
  const currentPrice = isDuo ? product.duoPrice : product.singlePrice;
  const currentMrp = isDuo ? product.duoMrp : product.singleMrp;
  const discountPct =
    currentMrp && currentPrice && currentMrp > currentPrice
      ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100)
      : 0;

  const duoDiscountPct =
    product.duoMrp && product.duoPrice && product.duoMrp > product.duoPrice
      ? Math.round(((product.duoMrp - product.duoPrice) / product.duoMrp) * 100)
      : product.singlePrice && product.duoPrice && product.singlePrice * 2 > product.duoPrice
      ? Math.round(((product.singlePrice * 2 - product.duoPrice) / (product.singlePrice * 2)) * 100)
      : 0;

  return (
    <article className="product-card" data-id={product.id}>
      <div
        className="card-media-wrapper"
        onClick={() => openPdp(product.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className="badge-corner">
          {product.badge && (
            <span className={`badge-pill ${product.badgeType || 'badge-gold'}`}>{product.badge}</span>
          )}
          {discountPct > 0 && <span className="badge-pill badge-save">SAVE {discountPct}%</span>}
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
          aria-label={`View formulation details for ${product.name}`}
        >
          <span>View Formulation Details</span>
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>&rarr;</span>
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
            {duoDiscountPct > 0 && (
              <span style={{ color: '#166534', fontSize: '0.65rem' }}>(-{duoDiscountPct}%)</span>
            )}
          </button>
        </div>

        <div className="card-pricing-row">
          <span className="current-price">₹{currentPrice}</span>
          {currentMrp > currentPrice && (
            <span className="original-price">₹{currentMrp}</span>
          )}
          {discountPct > 0 && (
            <span className="discount-pill">{discountPct}% OFF</span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'center' }}>
          <button
            className="card-cta-btn"
            onClick={() => addToCart(product.id, chosenPack)}
          >
            <ShoppingBag size={16} strokeWidth={2.2} />
            <span>Add to Cart</span>
            <span>•</span>
            <span>₹{currentPrice}</span>
          </button>
          <button
            className="card-spec-btn"
            onClick={() => openPdp(product.id)}
            title="View Full Formulation Specs"
            aria-label="View Full Formulation Specs"
          >
            <Eye size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </article>
  );
}

