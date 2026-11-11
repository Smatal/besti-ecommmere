'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, BundleKit } from '@/shared/types/product';
import { PRODUCTS, BUNDLE_KITS } from '@/shared/data/products';

export interface CartItemModel {
  id: string;
  isBundle?: boolean;
  product: {
    id?: string;
    name: string;
    subtitle?: string;
    image: string;
  };
  packType?: 'single' | 'duo';
  packLabel: string;
  price: number;
  quantity: number;
}

interface AppliedCoupon {
  code: string;
  pct: number;
}

interface CartContextType {
  cart: CartItemModel[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  activePdpId: string | null;
  openPdp: (id: string) => void;
  closePdp: () => void;
  selectedPack: Record<string, 'single' | 'duo'>;
  setSelectedPackForProduct: (productId: string, pack: 'single' | 'duo') => void;
  addToCart: (productId: string, packType?: 'single' | 'duo') => void;
  addBundleToCart: (bundleId: string) => void;
  updateItemQty: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  shippingProgressPct: number;
  shippingMsg: string;
  freebieTierText: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activePdpId, setActivePdpId] = useState<string | null>(null);
  const [selectedPack, setSelectedPack] = useState<Record<string, 'single' | 'duo'>>({});
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize packs
  useEffect(() => {
    const initialPacks: Record<string, 'single' | 'duo'> = {};
    PRODUCTS.forEach((p) => {
      initialPacks[p.id] = 'single';
    });
    setSelectedPack(initialPacks);

    try {
      const saved = localStorage.getItem('bestie_cart_v2');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsMounted(true);
  }, []);

  // Save cart
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('bestie_cart_v2', JSON.stringify(cart));
      } catch (e) {
        console.warn('Storage quota', e);
      }
    }
  }, [cart, isMounted]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const openPdp = (id: string) => setActivePdpId(id);
  const closePdp = () => setActivePdpId(null);

  const setSelectedPackForProduct = (productId: string, pack: 'single' | 'duo') => {
    setSelectedPack((prev) => ({ ...prev, [productId]: pack }));
  };

  const addToCart = (productId: string, packType?: 'single' | 'duo') => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const chosenPack = packType || selectedPack[productId] || 'single';
    const isDuo = chosenPack === 'duo';
    const price = isDuo ? product.duoPrice : product.singlePrice;
    const packLabel = isDuo ? 'Pack of 2 (Duo Deal)' : 'Single Unit';

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === productId && item.packType === chosenPack
      );
      if (existingIdx > -1) {
        const next = [...prev];
        const existing = next[existingIdx];
        if (existing) {
          next[existingIdx] = { ...existing, quantity: existing.quantity + 1 };
        }
        return next;
      } else {
        return [
          ...prev,
          {
            id: productId,
            product: {
              id: product.id,
              name: product.name,
              subtitle: product.subtitle,
              image: product.image,
            },
            packType: chosenPack,
            packLabel,
            price,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`Added ${product.name} (${packLabel}) to your cart! ✨`);
    openCart();
  };

  const addBundleToCart = (bundleId: string) => {
    const bundle = BUNDLE_KITS.find((b) => b.id === bundleId);
    if (!bundle) return;

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === bundle.id);
      if (existingIdx > -1) {
        const next = [...prev];
        const existing = next[existingIdx];
        if (existing) {
          next[existingIdx] = { ...existing, quantity: existing.quantity + 1 };
        }
        return next;
      } else {
        const firstProduct = PRODUCTS.find((p) => p.id === bundle.items[0]);
        return [
          ...prev,
          {
            id: bundle.id,
            isBundle: true,
            product: {
              name: bundle.title,
              subtitle: bundle.itemNames,
              image: firstProduct?.image || '/client_assets/sunscreen.jpg',
            },
            packLabel: `Curated Kit + ${bundle.freebie}`,
            price: bundle.price,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`Added ${bundle.title} to your cart with ${bundle.savings}! 🎁`);
    openCart();
  };

  const updateItemQty = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const target = next[index];
      if (!target) return prev;
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index] = { ...target, quantity: newQty };
      }
      return next;
    });
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const applyCoupon = (code: string): boolean => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'BESTIE10' || clean === 'GLOW10') {
      setAppliedCoupon({ code: clean, pct: 10 });
      showToast('🎉 Coupon BESTIE10 applied! 10% Extra Discount unlocked!');
      return true;
    } else if (clean === 'DIWALI20') {
      setAppliedCoupon({ code: clean, pct: 20 });
      showToast('🎉 Coupon DIWALI20 applied! 20% Special Discount unlocked!');
      return true;
    } else {
      showToast('❌ Invalid code. Try code "BESTIE10" for 10% off!');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.pct) / 100) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Milestone Progress
  let shippingProgressPct = 0;
  let shippingMsg = 'Add items to unlock <strong>FREE Delivery & Gifts</strong>';
  let freebieTierText = '🔒 Free Delivery at ₹499';

  if (subtotal > 0 && subtotal < 499) {
    const diff = 499 - subtotal;
    shippingProgressPct = Math.round((subtotal / 499) * 33);
    shippingMsg = `Add <strong>₹${diff}</strong> more for <strong>FREE Delivery</strong>`;
    freebieTierText = '🚚 Step 1: Free Delivery at ₹499';
  } else if (subtotal >= 499 && subtotal < 999) {
    const diff = 999 - subtotal;
    shippingProgressPct = 33 + Math.round(((subtotal - 499) / 500) * 33);
    shippingMsg = `🎉 <strong>FREE Delivery Unlocked!</strong> Add <strong>₹${diff}</strong> for a <strong>Free Deluxe Mini Cleanser</strong>`;
    freebieTierText = '🎁 Next: Free Mini Cleanser at ₹999';
  } else if (subtotal >= 999 && subtotal < 1499) {
    const diff = 1499 - subtotal;
    shippingProgressPct = 66 + Math.round(((subtotal - 999) / 500) * 34);
    shippingMsg = `🎁 <strong>Free Mini Cleanser Added!</strong> Add <strong>₹${diff}</strong> for a <strong>Free Bestie Tote Bag</strong>`;
    freebieTierText = '👜 Next: Free Tote Bag at ₹1,499';
  } else if (subtotal >= 1499) {
    shippingProgressPct = 100;
    shippingMsg = '🌟 <strong>VIP Reward Unlocked!</strong> Free Delivery + Deluxe Mini + Bestie Tote Bag Included!';
    freebieTierText = '✨ All Milestone Freebies Unlocked!';
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        activePdpId,
        openPdp,
        closePdp,
        selectedPack,
        setSelectedPackForProduct,
        addToCart,
        addBundleToCart,
        updateItemQty,
        removeItem,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discountAmount,
        finalTotal,
        toastMessage,
        showToast,
        shippingProgressPct,
        shippingMsg,
        freebieTierText,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

