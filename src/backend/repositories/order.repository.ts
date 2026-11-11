import { prisma } from "@/backend/db/client";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";

export interface CreateOrderItemData {
  productId: string;
  productName: string;
  packType: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CreateOrderParams {
  id: string;
  customerId: string;
  addressId: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: CreateOrderItemData[];
}

export class OrderRepository {
  static async createOrder(data: CreateOrderParams) {
    return prisma.order.create({
      data: {
        id: data.id,
        customerId: data.customerId,
        addressId: data.addressId,
        subtotal: data.subtotal,
        discountAmount: data.discountAmount,
        shippingFee: data.shippingFee,
        totalAmount: data.totalAmount,
        couponCode: data.couponCode,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        status: OrderStatus.CONFIRMED,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            packType: item.packType,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        items: true,
        customer: true,
        address: true,
      },
    });
  }

  static async getOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        customer: true,
        address: true,
        payment: true,
      },
    });
  }

  static async updateStatus(orderId: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  static async updatePaymentStatus(orderId: string, paymentStatus: PaymentStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        status: paymentStatus === PaymentStatus.PAID ? OrderStatus.PROCESSING : undefined,
      },
    });
  }

  static async listCustomerOrders(customerId: string) {
    return prisma.order.findMany({
      where: { customerId },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}

