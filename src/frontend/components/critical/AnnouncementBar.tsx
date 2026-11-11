import React from 'react';

export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <span className="announcement-badge">Diwali Glow Offer</span>
        <span>
          Enjoy <strong>FREE Delivery</strong> on orders over ₹499 • 100% Dermatologist-Formulated
        </span>
        <a href="#bestsellers" className="announcement-link">
          Explore Bestsellers →
        </a>
      </div>
    </div>
  );
}

