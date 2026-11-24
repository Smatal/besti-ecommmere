'use client';

import React from 'react';
import { useCart } from '@/frontend/context/CartContext';
import { Sparkles } from 'lucide-react';

export function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-notification active" id="toastNotification" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <Sparkles size={16} strokeWidth={2.2} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
      <span>{toastMessage}</span>
    </div>
  );
}

