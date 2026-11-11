import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, BUNDLE_KITS } from "@/shared/data/products";
import { apiSuccess } from "@/shared/types/api.types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const products = category && category !== "all"
    ? PRODUCTS.filter((p) => p.category === category)
    : PRODUCTS;

  return NextResponse.json(
    apiSuccess({
      products,
      bundles: BUNDLE_KITS,
      total: products.length,
    }),
    { status: 200 }
  );
}

