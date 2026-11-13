'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { Product, BundleKit } from '@/shared/types/product';

export interface CatalogContextValue {
  products: Product[];
  bundles: BundleKit[];
  categories: { id: string; name: string }[];
  getProductById: (id: string) => Product | undefined;
  getBundleById: (id: string) => BundleKit | undefined;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

interface CatalogProviderProps {
  children: React.ReactNode;
  initialProducts: Product[];
  initialBundles: BundleKit[];
  initialCategories: { id: string; name: string }[];
}

export function CatalogProvider({
  children,
  initialProducts,
  initialBundles,
  initialCategories,
}: CatalogProviderProps) {
  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    initialProducts.forEach((p) => {
      map.set(p.id, p);
    });
    return map;
  }, [initialProducts]);

  const bundleMap = useMemo(() => {
    const map = new Map<string, BundleKit>();
    initialBundles.forEach((b) => {
      map.set(b.id, b);
    });
    return map;
  }, [initialBundles]);

  const getProductById = (id: string) => productMap.get(id);
  const getBundleById = (id: string) => bundleMap.get(id);

  const value = useMemo(
    () => ({
      products: initialProducts,
      bundles: initialBundles,
      categories: initialCategories,
      getProductById,
      getBundleById,
    }),
    [initialProducts, initialBundles, initialCategories, productMap, bundleMap]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
