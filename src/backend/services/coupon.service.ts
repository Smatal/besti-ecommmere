import { CouponRepository } from "@/backend/repositories/coupon.repository";

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  discountAmount: number;
  message: string;
}

export class CouponService {
  // Built-in active discount codes (can also be queried from DB)
  private static BUILTIN_COUPONS: Record<string, { pct: number; minSubtotal: number }> = {
    BESTIE10: { pct: 10, minSubtotal: 0 },
    GLOW10: { pct: 10, minSubtotal: 0 },
    DIWALI20: { pct: 20, minSubtotal: 499 },
  };

  static async validateAndCalculateDiscount(
    code: string | undefined,
    subtotal: number
  ): Promise<CouponValidationResult> {
    if (!code || !code.trim()) {
      return { valid: false, code: "", discountAmount: 0, message: "No coupon provided" };
    }

    const cleanCode = code.trim().toUpperCase();

    // 1. Check in database
    const dbCoupon = await CouponRepository.getCouponByCode(cleanCode).catch(() => null);

    if (dbCoupon && dbCoupon.isActive) {
      if (subtotal < dbCoupon.minOrderValue) {
        return {
          valid: false,
          code: cleanCode,
          discountAmount: 0,
          message: `Minimum order of ₹${dbCoupon.minOrderValue} required for ${cleanCode}.`,
        };
      }

      let discount = 0;
      if (dbCoupon.discountPercent) {
        discount = Math.round((subtotal * dbCoupon.discountPercent) / 100);
      } else if (dbCoupon.flatDiscount) {
        discount = dbCoupon.flatDiscount;
      }

      if (dbCoupon.maxDiscount && discount > dbCoupon.maxDiscount) {
        discount = dbCoupon.maxDiscount;
      }

      return {
        valid: true,
        code: cleanCode,
        discountAmount: discount,
        message: `🎉 Coupon ${cleanCode} applied successfully!`,
      };
    }

    // 2. Check built-in fallback rules
    const builtin = this.BUILTIN_COUPONS[cleanCode];
    if (builtin) {
      if (subtotal < builtin.minSubtotal) {
        return {
          valid: false,
          code: cleanCode,
          discountAmount: 0,
          message: `Minimum cart value of ₹${builtin.minSubtotal} required for ${cleanCode}.`,
        };
      }
      const discount = Math.round((subtotal * builtin.pct) / 100);
      return {
        valid: true,
        code: cleanCode,
        discountAmount: discount,
        message: `🎉 Coupon ${cleanCode} applied! (${builtin.pct}% OFF)`,
      };
    }

    return {
      valid: false,
      code: cleanCode,
      discountAmount: 0,
      message: `Invalid coupon code "${cleanCode}". Try code "BESTIE10" for 10% off!`,
    };
  }
}

