'use client';

import React, { useState } from 'react';
import { useCart } from '@/frontend/context/CartContext';

export function Hero() {
  const { openPdp } = useCart();
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = document.getElementById('heroReelVideo') as HTMLVideoElement | null;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section className="hero-section">
      <div className="container hero-editorial-grid">
        {/* Left Content Column */}
        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-icon"></span>
            <span>Dermatologist-Formulated • Clinic-Grade Science</span>
          </div>

          <h1 className="hero-title">
            Daily Protection,
            <span className="highlight">Radiant You.</span>
          </h1>

          <p className="hero-description">
            Lightweight, clinic-grade skin and hair care formulated for Indian skin tones.
            High-potency broad spectrum SPF 50+ PA++++, targeted active serums, and barrier repair
            essentials — 100% free from parabens, sulfates, and white cast.
          </p>

          {/* Key Feature Badges Row */}
          <div className="hero-feature-tags">
            <span className="feature-tag">☀️ SPF 50+ PA++++ (ISO 24444)</span>
            <span className="feature-tag">💧 100% Zero White Cast</span>
            <span className="feature-tag">✨ Active Kojic &amp; 20% Vit C</span>
          </div>

          <div className="hero-cta-group">
            <a
              href="#bestsellers"
              className="btn btn-gold"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Bestsellers
              <span>→</span>
            </a>
            <a
              href="#routineFinder"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('routineFinder')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Find What Works 🎯
            </a>
          </div>

          {/* Social Proof Bar */}
          <div className="hero-social-proof">
            <div className="social-proof-stars">★★★★★</div>
            <div className="social-proof-text">
              <strong>4.9 / 5.0 Rating</strong>
              <span>Based on 10,000+ verified clinical skin routines</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-icon">🩺</span>
              <div className="trust-text">
                <strong>In-Vivo ISO 24444</strong>
                <span>Dermatologist certified</span>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🌿</span>
              <div className="trust-text">
                <strong>Clean Formulation</strong>
                <span>0% Parabens &amp; Sulfates</span>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🐰</span>
              <div className="trust-text">
                <strong>100% Cruelty Free</strong>
                <span>Ethical &amp; compassionate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual Showcase: Dual Packshot & High-Definition Video Reel */}
        <div className="hero-stage-column">
          <div className="hero-editorial-showcase">
            {/* Ambient Halo Glow */}
            <div className="stage-ambient-glow"></div>

            {/* Card 1: Aqua Gel Sunscreen Flagship Card */}
            <div
              className="editorial-card packshot-card"
              onClick={() => openPdp('sunscreen')}
              title="View Aqua Gel Sunscreen SPF 50+"
              style={{ cursor: 'pointer' }}
            >
              <div className="card-glass-badge">
                <span className="badge-star">★</span> Flagship Bestseller
              </div>
              <div className="card-img-wrap">
                <img
                  src="/client_assets/sunscreen.jpg"
                  alt="Aqua Gel Sunscreen SPF 50+ PA++++"
                />
              </div>
              <div className="hero-card-meta">
                <div className="meta-title">Aqua Gel Sunscreen</div>
                <div className="meta-sub">SPF 50+ PA++++ • Zero White Cast</div>
                <div className="meta-price-row">
                  <span className="price-val">₹499</span>
                  <span className="price-mrp">₹599</span>
                  <span className="view-pill">View Details →</span>
                </div>
              </div>
            </div>

            {/* Card 2: Live Application Video Reel Card */}
            <div
              className="editorial-card video-reel-card"
              title="Watch Kojic Acid Serum Application"
            >
              <div className="video-live-badge">
                <span className="live-dot"></span> In Action Demo
              </div>
              <div className="reel-video-wrap">
                <video
                  id="heroReelVideo"
                  src="/client_assets/serum_video.mp4"
                  className="reel-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                ></video>
                <button
                  type="button"
                  className="reel-sound-btn"
                  onClick={toggleSound}
                  aria-label="Toggle Sound"
                  title="Click to Unmute / Mute"
                >
                  <span id="heroSoundIcon">{isMuted ? '🔇' : '🔊'}</span>
                </button>
              </div>
              <div
                className="hero-card-meta"
                onClick={() => openPdp('kojic')}
                style={{ cursor: 'pointer' }}
              >
                <div className="meta-title">Kojic Acid Glow Serum</div>
                <div className="meta-sub">Water-light glide • Rapid absorption</div>
                <div className="meta-price-row">
                  <span className="price-val">₹599</span>
                  <span className="price-mrp">₹749</span>
                  <span className="view-pill">Shop Serum →</span>
                </div>
              </div>
            </div>

            {/* Floating Guarantee Badge */}
            <div className="hero-floating-guarantee">
              <span className="guarantee-icon">💛</span>
              <span className="guarantee-text">
                Bestie Cares Promise: 100% Non-Greasy &amp; Zero White Cast
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

