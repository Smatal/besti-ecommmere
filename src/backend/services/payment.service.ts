import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "@/backend/env";

export class PaymentService {
  private static getRazorpayInstance(): Razorpay | null {
    if (!env.NEXT_PUBLIC_RAZORPAY_KEY_ID || env.NEXT_PUBLIC_RAZORPAY_KEY_ID.includes("YourKeyId")) {
      return null;
    }
    return new Razorpay({
      key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  static async createRazorpayOrder(params: {
    amount: number; // in INR
    receipt: string;
    notes?: Record<string, string>;
  }): Promise<{ id: string; amount: number; currency: string }> {
    const razorpay = this.getRazorpayInstance();

    // If Razorpay keys are not set, provide a mock dev order ID
    if (!razorpay) {
      return {
        id: `order_dev_${Math.random().toString(36).substring(2, 11)}`,
        amount: params.amount * 100,
        currency: "INR",
      };
    }

    const order = await razorpay.orders.create({
      amount: Math.round(params.amount * 100), // convert to paise
      currency: "INR",
      receipt: params.receipt,
      notes: params.notes,
    });

    return {
      id: order.id,
      amount: order.amount as number,
      currency: order.currency,
    };
  }

  static verifySignature(params: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): boolean {
    const secret = env.RAZORPAY_KEY_SECRET;
    if (!secret || secret.includes("YourRazorpaySecret")) {
      return true; // allow dev testing
    }

    const body = `${params.razorpayOrderId}|${params.razorpayPaymentId}`;
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
    return expected === params.razorpaySignature;
  }

  static verifyWebhookSignature(payload: string, signature: string): boolean {
    const secret = env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret || secret.includes("YourRazorpayWebhook")) return true;

    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return expected === signature;
  }
}

