'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/shared/types/product';
import { PRODUCTS } from '@/shared/data/products';
import { useCart } from '@/frontend/context/CartContext';

export function RoutineFinderSection() {
  const { openPdp, addToCart } = useCart();
  const [activeMenu, setActiveMenu] = useState<'product' | 'concern' | 'skintype' | null>(null);

  const [selectedProduct, setSelectedProduct] = useState({ val: 'all', label: 'All Products' });
  const [selectedConcern, setSelectedConcern] = useState({ val: 'all', label: 'All Concerns' });
  const [selectedSkinType, setSelectedSkinType] = useState({ val: 'all', label: 'All Types' });

  const [results, setResults] = useState<Product[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: 'product' | 'concern' | 'skintype', e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const handleSelect = (
    type: 'product' | 'concern' | 'skintype',
    val: string,
    label: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (type === 'product') setSelectedProduct({ val, label });
    if (type === 'concern') setSelectedConcern({ val, label });
    if (type === 'skintype') setSelectedSkinType({ val, label });
    setActiveMenu(null);
  };

  const runFinder = () => {
    const matches = PRODUCTS.filter((p) => {
      const catMatch =
        selectedProduct.val === 'all' ||
        p.category === selectedProduct.val ||
        (selectedProduct.val === 'serums' && p.category === 'serum') ||
        (selectedProduct.val === 'cleansers' && (p.category === 'facewash' || p.category === 'lotion'));
      const conMatch = selectedConcern.val === 'all' || p.concern === selectedConcern.val;
      const skinMatch =
        selectedSkinType.val === 'all' ||
        p.skinType === 'all' ||
        p.skinType === selectedSkinType.val;
      return catMatch && conMatch && skinMatch;
    });
    setResults(matches);
  };

  return (
    <section className="container routine-finder-section" id="routineFinder" ref={containerRef}>
      <div className="routine-finder-box">
        <div className="finder-header">
          <h3 className="finder-main-title">Not Sure Where to Start? Let&apos;s Make This Easy.</h3>
          <p className="finder-main-sub">
            Select a product, match your concern &amp; get personalised recommendations
          </p>
        </div>

        {/* Segmented Chosen-Style Filter Bar */}
        <div className="segmented-finder-bar">
          {/* Segment 1: Product */}
          <div
            className={`finder-segment ${activeMenu === 'product' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown('product', e)}
          >
            <span className="segment-label">PRODUCT</span>
            <div className="segment-trigger">
              <span className="segment-val-text">{selectedProduct.label}</span>
              <span className="segment-chevron">▾</span>
            </div>

            {/* Custom Luxury Dropdown */}
            <div className={`custom-dropdown-menu ${activeMenu === 'product' ? 'active' : ''}`}>
              <div
                className={`dropdown-item ${selectedProduct.val === 'all' ? 'active' : ''}`}
                onClick={(e) => handleSelect('product', 'all', 'All Products', e)}
              >
                <span className="item-text">✨ All Formulations</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedProduct.val === 'sunscreen' ? 'active' : ''}`}
                onClick={(e) => handleSelect('product', 'sunscreen', 'Sunscreen', e)}
              >
                <span className="item-text">☀️ Sunscreen (SPF 50+ PA++++)</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedProduct.val === 'serums' ? 'active' : ''}`}
                onClick={(e) => handleSelect('product', 'serums', 'Face Serums', e)}
              >
                <span className="item-text">🧪 Face Serums (Vit C, Collagen, Kojic)</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedProduct.val === 'cleansers' ? 'active' : ''}`}
                onClick={(e) => handleSelect('product', 'cleansers', 'Cleansers & Lotions', e)}
              >
                <span className="item-text">🧴 Cleansers &amp; Lotions</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedProduct.val === 'haircare' ? 'active' : ''}`}
                onClick={(e) => handleSelect('product', 'haircare', 'Hair & Scalp Therapy', e)}
              >
                <span className="item-text">🌿 Hair &amp; Scalp Therapy</span>
                <span className="item-check">✓</span>
              </div>
            </div>
          </div>

          <div className="segment-divider"></div>

          {/* Segment 2: Concern */}
          <div
            className={`finder-segment ${activeMenu === 'concern' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown('concern', e)}
          >
            <span className="segment-label">CONCERN</span>
            <div className="segment-trigger">
              <span className="segment-val-text">{selectedConcern.label}</span>
              <span className="segment-chevron">▾</span>
            </div>

            <div className={`custom-dropdown-menu ${activeMenu === 'concern' ? 'active' : ''}`}>
              <div
                className={`dropdown-item ${selectedConcern.val === 'all' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'all', 'All Concerns', e)}
              >
                <span className="item-text">🎯 All Skin Concerns</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'sun' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'sun', 'Sun Protection & Tanning', e)}
              >
                <span className="item-text">☀️ Sun Protection &amp; Tanning</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'pigmentation' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'pigmentation', 'Dark Spots & Melasma', e)}
              >
                <span className="item-text">✨ Dark Spots &amp; Melasma</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'aging' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'aging', 'Fine Lines & Elasticity', e)}
              >
                <span className="item-text">🧬 Fine Lines &amp; Elasticity</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'undereye' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'undereye', 'Dark Circles & Puffy Eyes', e)}
              >
                <span className="item-text">👁️ Dark Circles &amp; Puffy Eyes</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'dryness' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'dryness', 'Dry & Flaky Barrier', e)}
              >
                <span className="item-text">💧 Dry &amp; Flaky Barrier</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'dandruff' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'dandruff', 'Dandruff & Flakes', e)}
              >
                <span className="item-text">🌿 Persistent Scalp Dandruff</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedConcern.val === 'frizz' ? 'active' : ''}`}
                onClick={(e) => handleSelect('concern', 'frizz', 'Frizzy & Tangled Hair', e)}
              >
                <span className="item-text">💆 Frizzy &amp; Tangled Hair</span>
                <span className="item-check">✓</span>
              </div>
            </div>
          </div>

          <div className="segment-divider"></div>

          {/* Segment 3: Skin/Hair Type */}
          <div
            className={`finder-segment ${activeMenu === 'skintype' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown('skintype', e)}
          >
            <span className="segment-label">SKIN TYPE</span>
            <div className="segment-trigger">
              <span className="segment-val-text">{selectedSkinType.label}</span>
              <span className="segment-chevron">▾</span>
            </div>

            <div className={`custom-dropdown-menu ${activeMenu === 'skintype' ? 'active' : ''}`}>
              <div
                className={`dropdown-item ${selectedSkinType.val === 'all' ? 'active' : ''}`}
                onClick={(e) => handleSelect('skintype', 'all', 'All Types', e)}
              >
                <span className="item-text">🧴 All Skin / Hair Types</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedSkinType.val === 'oily' ? 'active' : ''}`}
                onClick={(e) => handleSelect('skintype', 'oily', 'Oily / Acne Prone', e)}
              >
                <span className="item-text">🫧 Oily / Acne Prone</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedSkinType.val === 'dry' ? 'active' : ''}`}
                onClick={(e) => handleSelect('skintype', 'dry', 'Dry / Dehydrated', e)}
              >
                <span className="item-text">🌾 Dry / Dehydrated</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedSkinType.val === 'sensitive' ? 'active' : ''}`}
                onClick={(e) => handleSelect('skintype', 'sensitive', 'Sensitive / Reactive', e)}
              >
                <span className="item-text">🌸 Sensitive / Reactive</span>
                <span className="item-check">✓</span>
              </div>
              <div
                className={`dropdown-item ${selectedSkinType.val === 'combination' ? 'active' : ''}`}
                onClick={(e) => handleSelect('skintype', 'combination', 'Combination Skin', e)}
              >
                <span className="item-text">⚖️ Combination Skin</span>
                <span className="item-check">✓</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button type="button" className="btn btn-finder-action" onClick={runFinder}>
            FIND WHAT WORKS →
          </button>
        </div>

        {/* Result Dropdown */}
        {results !== null && (
          <div className="finder-result-box" style={{ display: 'block' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <h4
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>✨</span> <span>Recommended Clinical Routine:</span>
              </h4>
              <button
                type="button"
                onClick={() => setResults(null)}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                Clear Results
              </button>
            </div>

            {results.length > 0 ? (
              <div className="finder-results-grid">
                {results.map((p) => (
                  <div className="finder-result-card" key={p.id}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="result-card-img"
                      onClick={() => openPdp(p.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="result-card-info">
                      <span className="result-badge">{p.badge}</span>
                      <h5
                        className="result-title"
                        onClick={() => openPdp(p.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {p.name}
                      </h5>
                      <p className="result-desc">{p.subtitle}</p>
                      <div className="result-price-row">
                        <span className="result-price">₹{p.singlePrice}</span>
                        <span className="result-mrp">₹{p.singleMrp}</span>
                      </div>
                    </div>
                    <button
                      className="btn btn-gold result-add-btn"
                      onClick={() => addToCart(p.id)}
                    >
                      + Add to Routine
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.92rem',
                }}
              >
                No exact match found for these filters. Try selecting &ldquo;All Formulations&rdquo;
                or explore our bestsellers below!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

