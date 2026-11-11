import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/backend/services/order.service";
import { apiSuccess, apiError } from "@/shared/types/api.types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(apiError("Order ID is required", "MISSING_ID"), { status: 400 });
    }

    const order = await OrderService.getOrderDetails(id);
    if (!order) {
      return NextResponse.json(apiError("Order not found", "NOT_FOUND"), { status: 404 });
    }

    return NextResponse.json(apiSuccess(order), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(apiError(message, "INTERNAL_ERROR"), { status: 500 });
  }
}

