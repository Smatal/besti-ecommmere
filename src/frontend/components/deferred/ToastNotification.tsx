'use client';

import React from 'react';
import { useCart } from '@/frontend/context/CartContext';

export function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-notification active" id="toastNotification">
      <span className="toast-icon">✨</span>
      <span>{toastMessage}</span>
    </div>
  );
}

