import { NextRequest, NextResponse } from "next/server";
import { checkoutRequestSchema } from "@/shared/schemas/checkout.schema";
import { OrderService } from "@/backend/services/order.service";
import { apiSuccess, apiError } from "@/shared/types/api.types";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = checkoutRequestSchema.parse(body);

    const result = await OrderService.processCheckout(validatedInput);

    return NextResponse.json(apiSuccess(result), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        apiError(
          error.issues.map((i) => i.message).join(", "),
          "VALIDATION_ERROR"
        ),
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(apiError(message, "INTERNAL_ERROR"), { status: 500 });
  }
}

