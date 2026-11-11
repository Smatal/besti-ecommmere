import React from 'react';

export function ScienceAuthoritySection() {
  return (
    <section className="section-padding authority-section">
      <div className="container authority-grid">
        <div className="authority-text-col">
          <div className="quote-symbol">“</div>
          <p className="authority-quote">
            Healthy skin doesn&apos;t need 10 unnecessary steps. It needs{' '}
            <strong>pure active ingredients at clinical percentages</strong>, delivered in formulas
            that feel weightless on your skin every single day.
          </p>
          <div className="authority-bio">
            <h4>The Bestie Cares Guarantee</h4>
            <p>Love • Care • Compassion • Trust</p>
          </div>
        </div>

        <div className="promise-checklist">
          <div className="promise-item">
            <span className="check-icon">✓</span>
            <div>
              <h5>Zero White Cast</h5>
              <p>Invisible protection engineered for Indian skin tones.</p>
            </div>
          </div>
          <div className="promise-item">
            <span className="check-icon">✓</span>
            <div>
              <h5>Paraben &amp; Sulfate Free</h5>
              <p>Non-toxic clean science without harmful additives.</p>
            </div>
          </div>
          <div className="promise-item">
            <span className="check-icon">✓</span>
            <div>
              <h5>Dermatologically Tested</h5>
              <p>Rigorous clinical patch testing for zero irritation.</p>
            </div>
          </div>
          <div className="promise-item">
            <span className="check-icon">✓</span>
            <div>
              <h5>Cruelty Free &amp; Gentle</h5>
              <p>Ethical development with compassionate care.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

