'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(
  () => import('@/frontend/components/deferred/CartDrawer').then((mod) => mod.CartDrawer),
  { ssr: false }
);

const CheckoutModal = dynamic(
  () => import('@/frontend/components/deferred/CheckoutModal').then((mod) => mod.CheckoutModal),
  { ssr: false }
);

const ProductDetailModal = dynamic(
  () =>
    import('@/frontend/components/deferred/ProductDetailModal').then(
      (mod) => mod.ProductDetailModal
    ),
  { ssr: false }
);

const ToastNotification = dynamic(
  () =>
    import('@/frontend/components/deferred/ToastNotification').then(
      (mod) => mod.ToastNotification
    ),
  { ssr: false }
);

export function ClientModals() {
  return (
    <>
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <ToastNotification />
    </>
  );
}

