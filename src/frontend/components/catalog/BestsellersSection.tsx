'use client';

import React, { useState } from 'react';
import { Product } from '@/shared/types/product';
import { PRODUCTS } from '@/shared/data/products';
import { ProductCard } from './ProductCard';

interface BestsellersSectionProps {
  initialCategory?: string;
}

export function BestsellersSection({ initialCategory = 'all' }: BestsellersSectionProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          if (activeCategory === 'sunscreen') return p.category === 'sunscreen';
          if (activeCategory === 'serums' || activeCategory === 'serum') return p.category === 'serum';
          if (activeCategory === 'cleansers') return p.category === 'facewash' || p.category === 'lotion';
          if (activeCategory === 'haircare') return p.category === 'haircare';
          return p.category === activeCategory;
        });

  return (
    <section className="section-padding" id="bestsellers">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Doctor Formulated Essentials</span>
          <h2 className="section-title">Explore Our Bestsellers</h2>
          <p className="section-description">
            Each formula is balanced with high-performance active percentages for guaranteed results
            without sensitivity.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-tabs" role="tablist">
          <button
            className={`category-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Formulations
          </button>
          <button
            className={`category-tab-btn ${activeCategory === 'sunscreen' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sunscreen')}
          >
            Sunscreens
          </button>
          <button
            className={`category-tab-btn ${activeCategory === 'serums' || activeCategory === 'serum' ? 'active' : ''}`}
            onClick={() => setActiveCategory('serums')}
          >
            Face Serums
          </button>
          <button
            className={`category-tab-btn ${activeCategory === 'cleansers' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cleansers')}
          >
            Cleansers &amp; Lotions
          </button>
          <button
            className={`category-tab-btn ${activeCategory === 'haircare' ? 'active' : ''}`}
            onClick={() => setActiveCategory('haircare')}
          >
            Hair Care
          </button>
        </div>

        {/* Reactive Product Grid */}
        <div className="product-grid" id="productGrid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

