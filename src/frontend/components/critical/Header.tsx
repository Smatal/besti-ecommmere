'use client';

import React from 'react';
import { useCart } from '@/frontend/context/CartContext';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export function Header({ onSelectCategory, activeCategory = 'all' }: HeaderProps) {
  const { cartCount, openCart, closePdp, activePdpId } = useCart();

  const handleNavClick = (cat: string, targetId?: string) => {
    if (activePdpId) {
      closePdp();
    }
    if (onSelectCategory && cat) {
      onSelectCategory(cat);
    }
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo */}
        <a
          href="/"
          className="brand-logo"
          aria-label="Bestie Cares Home"
          onClick={(e) => {
            if (activePdpId) {
              e.preventDefault();
              closePdp();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="logo-badge">
            <span className="logo-heart">💛</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Bestie Cares</span>
            <span className="brand-tagline">Love • Care • Compassion • Trust</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="main-nav" aria-label="Main Navigation">
          <a
            href="#bestsellers"
            className={`nav-link ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('all', 'bestsellers');
            }}
          >
            Shop All
          </a>
          <a
            href="#bestsellers"
            className={`nav-link ${activeCategory === 'sunscreen' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('sunscreen', 'bestsellers');
            }}
          >
            Sunscreens
          </a>
          <a
            href="#bestsellers"
            className={`nav-link ${activeCategory === 'serum' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('serum', 'bestsellers');
            }}
          >
            Face Serums
          </a>
          <a
            href="#bestsellers"
            className={`nav-link ${activeCategory === 'cleansers' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('cleansers', 'bestsellers');
            }}
          >
            Cleansers & Lotions
          </a>
          <a
            href="#bestsellers"
            className={`nav-link ${activeCategory === 'haircare' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('haircare', 'bestsellers');
            }}
          >
            Hair & Scalp
          </a>
          <a
            href="#bundles"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('all', 'bundles');
            }}
          >
            Routine Bundles
          </a>
          <a
            href="#concerns"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('all', 'concerns');
            }}
          >
            Shop by Concern
          </a>
        </nav>

        {/* Utilities (Search & Cart) */}
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => {
              if (activePdpId) closePdp();
              document.getElementById('routineFinder')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Search or Routine Finder"
          >
            🔍
          </button>
          <button
            className="icon-btn"
            id="cartToggleBtn"
            onClick={openCart}
            aria-label="Open Shopping Cart"
          >
            🛍️
            <span className="cart-count" id="cartCountBadge">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

