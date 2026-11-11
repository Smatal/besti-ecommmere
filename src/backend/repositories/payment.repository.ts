import { prisma } from "@/backend/db/client";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

export class PaymentRepository {
  static async createPayment(params: {
    orderId: string;
    amount: number;
    method: PaymentMethod;
    razorpayOrderId?: string;
  }) {
    return prisma.payment.create({
      data: {
        orderId: params.orderId,
        amount: params.amount,
        method: params.method,
        razorpayOrderId: params.razorpayOrderId,
        status: PaymentStatus.PENDING,
      },
    });
  }

  static async markPaymentSuccess(params: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature?: string;
  }) {
    const payment = await prisma.payment.findUnique({
      where: { razorpayOrderId: params.razorpayOrderId },
    });

    if (!payment) return null;

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.PAID,
        razorpayPaymentId: params.razorpayPaymentId,
        razorpaySignature: params.razorpaySignature,
      },
    });

    await prisma.order.update({
      where: { id: payment.orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });

    return updatedPayment;
  }
}

