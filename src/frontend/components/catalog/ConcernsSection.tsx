'use client';

import React from 'react';
import { useCart } from '@/frontend/context/CartContext';

interface ConcernsSectionProps {
  onSelectCategory?: (category: string) => void;
}

export function ConcernsSection({ onSelectCategory }: ConcernsSectionProps) {
  const { openPdp } = useCart();

  const handleConcernClick = (cat?: string, pdpId?: string) => {
    if (pdpId) {
      openPdp(pdpId);
      return;
    }
    if (cat && onSelectCategory) {
      onSelectCategory(cat);
    }
    document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="section-padding"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}
      id="concerns"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Targeted Treatments</span>
          <h2 className="section-title">Shop by Skin &amp; Scalp Concern</h2>
          <p className="section-description">
            Choose your primary goal to see the clinical solution crafted specifically for it.
          </p>
        </div>

        <div className="concern-grid">
          {/* Sun Protection */}
          <div
            className="concern-card"
            onClick={() => handleConcernClick('sunscreen')}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="concern-icon-bubble"
              style={{ background: 'var(--teal-subtle)', color: 'var(--teal-primary)' }}
            >
              ☀️
            </div>
            <h3 className="concern-title">Sun Tanning &amp; UV Rays</h3>
            <p className="concern-desc">
              High UVA/UVB defense with SPF 50+ PA++++ that leaves zero greasy residue or white cast.
            </p>
            <span className="concern-link">View Sunscreen Solution →</span>
          </div>

          {/* Pigmentation & Spots */}
          <div
            className="concern-card"
            onClick={() => handleConcernClick('serums')}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="concern-icon-bubble"
              style={{ background: 'var(--wine-subtle)', color: 'var(--wine-primary)' }}
            >
              ✨
            </div>
            <h3 className="concern-title">Dark Spots &amp; Melasma</h3>
            <p className="concern-desc">
              Potent 2% Kojic Acid and Vitamin C serums that visibly fade post-acne scars and uneven
              pigmentation.
            </p>
            <span className="concern-link">View Brightening Serums →</span>
          </div>

          {/* Anti-Aging & Loss of Bounce */}
          <div
            className="concern-card"
            onClick={() => handleConcernClick('serums')}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="concern-icon-bubble"
              style={{ background: 'var(--sapphire-subtle)', color: 'var(--sapphire-primary)' }}
            >
              🧬
            </div>
            <h3 className="concern-title">Fine Lines &amp; Sagging Skin</h3>
            <p className="concern-desc">
              Multi-peptide collagen booster that stimulates cellular repair and restores plump, firm
              skin bounce.
            </p>
            <span className="concern-link">View Peptide Elixir →</span>
          </div>

          {/* Under Eye Bags & Dark Circles */}
          <div
            className="concern-card"
            onClick={() => handleConcernClick(undefined, 'undereye')}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="concern-icon-bubble"
              style={{ background: 'rgba(23,24,28,0.08)', color: 'var(--text-primary)' }}
            >
              👁️
            </div>
            <h3 className="concern-title">Puffy Eyes &amp; Dark Circles</h3>
            <p className="concern-desc">
              Cooling stainless-steel roller applicator delivering caffeine &amp; hyaluronic acid
              micro-circulation.
            </p>
            <span className="concern-link">View Under Eye Gel →</span>
          </div>

          {/* Dandruff & Scalp Flakes */}
          <div
            className="concern-card"
            onClick={() => handleConcernClick('haircare')}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="concern-icon-bubble"
              style={{ background: 'var(--amber-subtle)', color: 'var(--amber-primary)' }}
            >
              🌿
            </div>
            <h3 className="concern-title">Persistent Scalp Dandruff</h3>
            <p className="concern-desc">
              Clinical Ciclopirox Olamine + Tea Tree shampoo that eliminates dandruff without drying hair
              shafts.
            </p>
            <span className="concern-link">View Scalp Therapy →</span>
          </div>

          {/* Dryness & Damaged Barrier */}
          <div
            className="concern-card"
            onClick={() => handleConcernClick(undefined, 'lotion')}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="concern-icon-bubble"
              style={{ background: 'var(--berry-subtle)', color: 'var(--berry-primary)' }}
            >
              💧
            </div>
            <h3 className="concern-title">Dry &amp; Flaky Skin Barrier</h3>
            <p className="concern-desc">
              Multi-ceramide and shea butter moisture lock for 24-hour hydration and silky smooth
              barrier repair.
            </p>
            <span className="concern-link">View Ceramide Lotion →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

