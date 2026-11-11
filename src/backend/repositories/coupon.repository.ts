import { prisma } from "@/backend/db/client";

export class CouponRepository {
  static async getCouponByCode(code: string) {
    const cleanCode = code.trim().toUpperCase();
    return prisma.coupon.findUnique({
      where: { code: cleanCode },
    });
  }

  static async incrementCouponUsage(couponId: string) {
    return prisma.coupon.update({
      where: { id: couponId },
      data: {
        currentUses: { increment: 1 },
      },
    });
  }

  static async recordRedemption(params: {
    couponId: string;
    customerId: string;
    orderId: string;
    discountApplied: number;
  }) {
    return prisma.couponRedemption.create({
      data: {
        couponId: params.couponId,
        customerId: params.customerId,
        orderId: params.orderId,
        discountApplied: params.discountApplied,
      },
    });
  }
}

