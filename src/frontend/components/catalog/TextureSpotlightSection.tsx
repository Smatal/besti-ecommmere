'use client';

import React from 'react';

interface TextureSpotlightSectionProps {
  onSelectCategory?: (category: string) => void;
}

export function TextureSpotlightSection({ onSelectCategory }: TextureSpotlightSectionProps) {
  const handleCta = () => {
    if (onSelectCategory) {
      onSelectCategory('serums');
    }
    document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding video-spotlight-section" id="textureShowcase">
      <div className="container video-spotlight-grid">
        <div className="texture-video-box">
          <video
            src="/client_assets/serum_video.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>

        <div className="texture-info-content">
          <span className="section-subhead">Formulation In Action</span>
          <h3>Experience The Pure Drop Standard</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Every drop of our serums and sunscreen gel is engineered for micro-absorption. No heavy
            films, no pore-clogging waxes, just pure active nutrition that absorbs in seconds.
          </p>

          <div className="texture-feature-list">
            <div className="feature-row">
              <span className="feature-dot"></span>
              <p>
                <strong>Fast Absorption:</strong> Sinks into dermis within 10 seconds of application.
              </p>
            </div>
            <div className="feature-row">
              <span className="feature-dot"></span>
              <p>
                <strong>Non-Comedogenic:</strong> Breathable formula suitable for acne-prone skin.
              </p>
            </div>
            <div className="feature-row">
              <span className="feature-dot"></span>
              <p>
                <strong>Makeup-Friendly:</strong> Creates a silky smooth base for foundation or daily
                sunscreen.
              </p>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleCta}>
            Explore Serums &amp; Treatments
          </button>
        </div>
      </div>
    </section>
  );
}

