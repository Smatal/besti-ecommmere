'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Will the Aqua Gel Sunscreen SPF 50+ leave any white cast on melanin-rich skin?',
    a: 'Absolutely not. Bestie Cares Aqua Gel Sunscreen is formulated with micro-encapsulated organic UV filters that melt into a transparent, invisible water finish upon application. It has undergone extensive clinical testing across Indian Fitzpatrick skin types III to VI with 100% invisible finish verified.',
  },
  {
    q: 'Can I use 20% Vitamin C and 2% Kojic Acid together?',
    a: 'Yes, but we recommend splitting them between AM and PM routines for optimal efficacy. Use the Vitamin C 20% Brightening Serum in the morning followed by your Aqua Gel Sunscreen SPF 50+. Use the 2% Kojic Acid Serum at night before your Ceramide Moisturizer.',
  },
  {
    q: 'How fast is shipping and is Cash on Delivery (COD) available?',
    a: 'Orders are dispatched within 24 hours from our climate-controlled warehouse. Delivery typically takes 2 to 4 business days across metro and tier-2 Indian cities. Cash on Delivery (COD) and 1-Click Instant UPI (GPay/PhonePe/Paytm) are fully supported.',
  },
  {
    q: 'Are Bestie Cares formulations safe for sensitive and acne-prone skin?',
    a: 'Every Bestie Cares formulation is dermatologist patch-tested, non-comedogenic, and 100% free of parabens, sulfates, phthalates, and synthetic artificial perfumes. All actives are buffered with soothing botanicals like Licorice, Panthenol, and Allantoin.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="section-padding"
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}
      id="faq"
    >
      <div className="container" style={{ maxWidth: '860px' }}>
        <div className="section-header">
          <span className="section-subhead">Got Questions? We&apos;ve Got Answers.</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Everything you need to know about our active percentages, certifications, and delivery.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`faq-item ${isOpen ? 'active' : ''}`} key={index}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  type="button"
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer" style={{ display: 'block' }}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

