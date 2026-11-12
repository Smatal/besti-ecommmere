import { client } from "@/backend/sanity/lib/client";
import { isConfigured } from "@/backend/sanity/env";
import {
  ALL_PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
  ALL_BUNDLES_QUERY,
  ALL_CATEGORIES_QUERY,
} from "@/backend/sanity/queries";
import { PRODUCTS, BUNDLE_KITS } from "@/shared/data/products";
import { Product, BundleKit } from "@/shared/types/product";

export class SanityCatalogService {
  /**
   * Fetch all products from Sanity, falling back gracefully to static catalog
   */
  static async getProducts(categoryFilter?: string): Promise<Product[]> {
    if (isConfigured) {
      try {
        const sanityProducts = await client.fetch<Product[]>(ALL_PRODUCTS_QUERY);
        if (sanityProducts && sanityProducts.length > 0) {
          if (categoryFilter && categoryFilter !== "all") {
            return sanityProducts.filter((p) => p.category === categoryFilter);
          }
          return sanityProducts;
        }
      } catch (error) {
        console.warn("[SanityCatalogService] Fallback to static products:", error);
      }
    }

    // Graceful fallback to static verified catalog
    if (categoryFilter && categoryFilter !== "all") {
      return PRODUCTS.filter((p) => p.category === categoryFilter);
    }
    return PRODUCTS;
  }

  /**
   * Fetch a single product by ID or slug
   */
  static async getProductById(id: string): Promise<Product | null> {
    if (isConfigured) {
      try {
        const product = await client.fetch<Product | null>(PRODUCT_BY_ID_QUERY, { id });
        if (product) return product;
      } catch (error) {
        console.warn(`[SanityCatalogService] Fallback to static for product ${id}:`, error);
      }
    }

    return PRODUCTS.find((p) => p.id === id) || null;
  }

  /**
   * Fetch all bundles from Sanity, falling back gracefully to static catalog
   */
  static async getBundles(): Promise<BundleKit[]> {
    if (isConfigured) {
      try {
        const sanityBundles = await client.fetch<BundleKit[]>(ALL_BUNDLES_QUERY);
        if (sanityBundles && sanityBundles.length > 0) {
          return sanityBundles;
        }
      } catch (error) {
        console.warn("[SanityCatalogService] Fallback to static bundles:", error);
      }
    }

    return BUNDLE_KITS;
  }

  /**
   * Fetch all unique categories
   */
  static async getCategories(): Promise<{ id: string; name: string }[]> {
    if (isConfigured) {
      try {
        const sanityCategories = await client.fetch<{ id: string; name: string }[]>(
          ALL_CATEGORIES_QUERY
        );
        if (sanityCategories && sanityCategories.length > 0) {
          return sanityCategories;
        }
      } catch (error) {
        console.warn("[SanityCatalogService] Fallback to static categories:", error);
      }
    }

    // Default categories derived from products
    const unique = new Map<string, string>();
    PRODUCTS.forEach((p) => {
      if (!unique.has(p.category)) {
        unique.set(p.category, p.categoryName || p.category);
      }
    });

    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }
}
