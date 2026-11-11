'use server';

import { checkoutRequestSchema, CheckoutRequestInput } from "@/shared/schemas/checkout.schema";
import { OrderService } from "@/backend/services/order.service";
import { apiSuccess, apiError } from "@/shared/types/api.types";

export async function processCheckoutAction(rawInput: CheckoutRequestInput) {
  try {
    const validatedInput = checkoutRequestSchema.parse(rawInput);
    const result = await OrderService.processCheckout(validatedInput);
    return apiSuccess(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to process order";
    return apiError(message);
  }
}

export async function trackOrderAction(orderId: string) {
  try {
    if (!orderId || !orderId.trim()) {
      return apiError("Order ID is required");
    }
    const order = await OrderService.getOrderDetails(orderId.trim());
    if (!order) {
      return apiError("No order found with this ID", "NOT_FOUND");
    }
    return apiSuccess(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to track order";
    return apiError(message);
  }
}

