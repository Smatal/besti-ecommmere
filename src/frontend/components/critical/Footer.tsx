'use client';

import React from 'react';
import { useCart } from '@/frontend/context/CartContext';
import { BrandHeartIcon } from '../common/BrandHeartIcon';
import { CreditCard, Smartphone, ShieldCheck, Truck } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const { openCart, closePdp } = useCart();

  const handleCategoryClick = (cat: string) => {
    closePdp();
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand-logo" style={{ marginBottom: '16px' }}>
              <div className="logo-badge" style={{ background: '#000' }}>
                <BrandHeartIcon size={22} />
              </div>
              <div className="brand-text">
                <span className="brand-title" style={{ color: '#fff' }}>
                  Bestie Cares
                </span>
                <span className="brand-tagline">Love, Care, Compassion, Trust</span>
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#9ca3af', lineHeight: 1.6 }}>
              Dermatologically backed skincare and scalp treatments. Formulated with clinical active
              percentages for visible, long-lasting results.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product Lines</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#bestsellers"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick('sunscreen');
                  }}
                >
                  Aqua Gel Sunscreen SPF 50+
                </a>
              </li>
              <li>
                <a
                  href="#bestsellers"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick('serum');
                  }}
                >
                  Brightening Vitamin C 20%
                </a>
              </li>
              <li>
                <a
                  href="#bestsellers"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick('serum');
                  }}
                >
                  Collagen Peptide Serum
                </a>
              </li>
              <li>
                <a
                  href="#bestsellers"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick('serum');
                  }}
                >
                  Kojic Acid Dark Spot Elixir
                </a>
              </li>
              <li>
                <a
                  href="#bestsellers"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick('cleansers');
                  }}
                >
                  Glutathione Radiance Cleanser
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#routineFinder"
                  onClick={(e) => {
                    e.preventDefault();
                    closePdp();
                    document.getElementById('routineFinder')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Custom Routine Finder
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openCart();
                  }}
                >
                  Track Order Status
                </a>
              </li>
              <li>
                <a href="#faq">Shipping &amp; Returns Policy</a>
              </li>
              <li>
                <a href="#faq">Dermatologist Consultation</a>
              </li>
              <li>
                <a href="#faq">Contact Bestie Support</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Safe &amp; Verified Checkout</h4>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '12px' }}>
              Supports all major UPI methods (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Cash
              on Delivery.
            </p>
            <div className="footer-trust-badges">
              <div className="footer-trust-pill" title="Credit & Debit Cards">
                <CreditCard size={16} strokeWidth={1.8} />
                <span>Cards</span>
              </div>
              <div className="footer-trust-pill" title="Instant UPI (Google Pay, PhonePe, Paytm)">
                <Smartphone size={16} strokeWidth={1.8} />
                <span>Instant UPI</span>
              </div>
              <div className="footer-trust-pill" title="256-Bit SSL Encrypted">
                <ShieldCheck size={16} strokeWidth={1.8} />
                <span>256-Bit SSL</span>
              </div>
              <div className="footer-trust-pill" title="Tracked Express Shipping">
                <Truck size={16} strokeWidth={1.8} />
                <span>Tracked Shipping</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Bestie Cares. All Rights Reserved. Formulated with Love, Care, Compassion &amp;
            Trust.
          </div>
          <div>Dermatologically Tested • 100% Cruelty-Free • Made in India</div>
        </div>
      </div>
    </footer>
  );
}

