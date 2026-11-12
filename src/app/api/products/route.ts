import { NextRequest, NextResponse } from "next/server";
import { SanityCatalogService } from "@/backend/services/sanity.service";
import { apiSuccess } from "@/shared/types/api.types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;

  const [products, bundles, categories] = await Promise.all([
    SanityCatalogService.getProducts(category),
    SanityCatalogService.getBundles(),
    SanityCatalogService.getCategories(),
  ]);

  return NextResponse.json(
    apiSuccess({
      products,
      bundles,
      categories,
      total: products.length,
    }),
    { status: 200 }
  );
}
