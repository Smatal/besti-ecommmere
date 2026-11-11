'use client';

import React from 'react';
import { BUNDLE_KITS, PRODUCTS } from '@/shared/data/products';
import { useCart } from '@/frontend/context/CartContext';

export function BundleKitsSection() {
  const { addBundleToCart } = useCart();

  return (
    <section className="section-padding bundle-kits-section" id="bundles">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">High-Value Clinical Regimens</span>
          <h2 className="section-title">Curated Bundles &amp; Complete Routine Kits</h2>
          <p className="section-description">
            Clinically paired multi-step active routines formulated to work in harmony. Enjoy up to
            36% OFF plus complimentary deluxe gifts.
          </p>
        </div>

        <div className="bundle-kits-grid" id="bundleKitsGrid">
          {BUNDLE_KITS.map((bundle) => {
            const productImgs = bundle.items
              .map((id) => PRODUCTS.find((p) => p.id === id)?.image)
              .filter(Boolean) as string[];

            return (
              <div className="bundle-kit-card" key={bundle.id}>
                <div className="bundle-kit-badge">{bundle.badge}</div>

                <div className="bundle-kit-media">
                  <div className="bundle-kit-thumbnails">
                    {productImgs.map((img, i) => (
                      <React.Fragment key={i}>
                        <img
                          src={img}
                          alt="Routine Product"
                          className="bundle-thumb"
                          loading="lazy"
                        />
                        {i < productImgs.length - 1 && <span className="bundle-plus">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="bundle-kit-body">
                  <h3 className="bundle-kit-title">{bundle.title}</h3>
                  <p className="bundle-kit-subtitle">{bundle.subtitle}</p>
                  <div className="bundle-kit-item-pills">
                    {bundle.itemNames.split(' + ').map((name, idx) => (
                      <span className="bundle-item-pill" key={idx}>
                        {name}
                      </span>
                    ))}
                  </div>

                  <div className="bundle-kit-freebie-tag">
                    <span style={{ fontSize: '1.1rem' }}>🎁</span>
                    <span>
                      Includes <strong>{bundle.freebie}</strong>
                    </span>
                  </div>

                  <div className="bundle-kit-pricing">
                    <div className="bundle-price-col">
                      <span className="bundle-curr-price">
                        ₹{bundle.price.toLocaleString('en-IN')}
                      </span>
                      <span className="bundle-mrp">₹{bundle.mrp.toLocaleString('en-IN')}</span>
                      <span className="bundle-savings-badge">{bundle.savings}</span>
                    </div>
                    <button
                      className="btn btn-gold"
                      onClick={() => addBundleToCart(bundle.id)}
                    >
                      Add Complete Routine 🛍️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

