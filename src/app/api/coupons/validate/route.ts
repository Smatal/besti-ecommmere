import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/shared/data/products";
import { CouponService } from "@/backend/services/coupon.service";
import { apiSuccess, apiError } from "@/shared/types/api.types";
import { z } from "zod";

const couponValidateSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        packType: z.enum(["single", "duo"]).default("single"),
        quantity: z.number().int().positive(),
      })
    )
    .default([]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, items } = couponValidateSchema.parse(body);

    // Calculate subtotal server-side strictly from product IDs
    let subtotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (product) {
        const price = item.packType === "duo" ? product.duoPrice : product.singlePrice;
        subtotal += price * item.quantity;
      }
    }

    const result = await CouponService.validateAndCalculateDiscount(code, subtotal);

    if (!result.valid) {
      return NextResponse.json(apiError(result.message, "INVALID_COUPON"), { status: 400 });
    }

    return NextResponse.json(apiSuccess(result), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(apiError(message, "ERROR"), { status: 500 });
  }
}

