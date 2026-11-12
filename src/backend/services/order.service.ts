import { PRODUCTS, BUNDLE_KITS } from "@/shared/data/products";
import { SanityCatalogService } from "@/backend/services/sanity.service";
import { CheckoutRequestInput } from "@/shared/schemas/checkout.schema";
import { CustomerRepository } from "@/backend/repositories/customer.repository";
import { OrderRepository, CreateOrderItemData } from "@/backend/repositories/order.repository";
import { PaymentRepository } from "@/backend/repositories/payment.repository";
import { CouponService } from "@/backend/services/coupon.service";
import { PaymentService } from "@/backend/services/payment.service";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { env } from "@/backend/env";

export class OrderService {
  /**
   * Process a checkout request strictly using IDs.
   * Calculates all prices, totals, and discounts server-side.
   */
  static async processCheckout(input: CheckoutRequestInput) {
    const verifiedItems: CreateOrderItemData[] = [];
    let subtotal = 0;

    // 1. Resolve standard product items by ID (queries Sanity with static fallback)
    for (const item of input.items) {
      const product = await SanityCatalogService.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product not found for ID: ${item.productId}`);
      }

      const isDuo = item.packType === "duo";
      const unitPrice = isDuo ? product.duoPrice : product.singlePrice;
      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        packType: isDuo ? "Pack of 2 (Duo Deal)" : "Single Unit",
        unitPrice,
        quantity: item.quantity,
        totalPrice,
      });
    }

    // 2. Resolve bundle kit if provided by ID
    if (input.bundleId) {
      const bundles = await SanityCatalogService.getBundles();
      const bundle = bundles.find((b) => b.id === input.bundleId) || BUNDLE_KITS.find((b) => b.id === input.bundleId);
      if (bundle) {
        subtotal += bundle.price;
        verifiedItems.push({
          productId: bundle.id,
          productName: bundle.title,
          packType: `Curated Kit + ${bundle.freebie}`,
          unitPrice: bundle.price,
          quantity: 1,
          totalPrice: bundle.price,
        });
      }
    }

    if (verifiedItems.length === 0) {
      throw new Error("Cannot checkout with an empty cart");
    }

    // 3. Server-side Coupon Calculation
    let discountAmount = 0;
    if (input.couponCode) {
      const couponResult = await CouponService.validateAndCalculateDiscount(
        input.couponCode,
        subtotal
      );
      if (couponResult.valid) {
        discountAmount = couponResult.discountAmount;
      }
    }

    // 4. Server-side Shipping Fee Calculation (Free on orders >= ₹499)
    const shippingFee = subtotal >= 499 ? 0 : 49;
    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

    // 5. Generate Order ID: BC-XXXXXX
    const orderId = `BC-${Math.floor(100000 + Math.random() * 900000)}`;

    // 6. Persist Customer & Shipping Address
    let customerId = `cust_${Math.random().toString(36).substring(2, 9)}`;
    let addressId = `addr_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const customer = await CustomerRepository.findOrCreateCustomer(
        input.shippingAddress.name,
        input.shippingAddress.phone,
        input.shippingAddress.email
      );
      customerId = customer.id;

      const address = await CustomerRepository.saveAddress(
        customer.id,
        input.shippingAddress
      );
      addressId = address.id;

      const paymentMethodEnum = input.paymentMethod as PaymentMethod;
      const paymentStatusEnum =
        paymentMethodEnum === PaymentMethod.COD ? PaymentStatus.PENDING : PaymentStatus.PENDING;

      await OrderRepository.createOrder({
        id: orderId,
        customerId: customer.id,
        addressId: address.id,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        couponCode: input.couponCode,
        paymentMethod: paymentMethodEnum,
        paymentStatus: paymentStatusEnum,
        items: verifiedItems,
      });
    } catch (dbError) {
      console.warn("Database storage skipped (connect DATABASE_URL in .env):", (dbError as Error).message);
    }

    // 8. Razorpay Order Generation (for Online / UPI / Card Payments)
    let razorpayOrder = null;
    const paymentMethodEnum = input.paymentMethod as PaymentMethod;
    if (paymentMethodEnum !== PaymentMethod.COD) {
      razorpayOrder = await PaymentService.createRazorpayOrder({
        amount: totalAmount,
        receipt: orderId,
        notes: {
          orderId,
          customerId,
          phone: input.shippingAddress.phone,
        },
      });

      try {
        await PaymentRepository.createPayment({
          orderId,
          amount: totalAmount,
          method: paymentMethodEnum,
          razorpayOrderId: razorpayOrder.id,
        });
      } catch {
        // ignore if offline
      }
    }

    return {
      orderId,
      customerId,
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount,
      status: "CONFIRMED",
      paymentMethod: input.paymentMethod,
      razorpay: razorpayOrder
        ? {
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          }
        : null,
    };
  }

  static async getOrderDetails(orderId: string) {
    try {
      const order = await OrderRepository.getOrderById(orderId);
      if (!order) return null;

      return {
        id: order.id,
        customerId: order.customerId,
        customerName: order.customer.name,
        customerPhone: order.customer.phone,
        shippingAddress: {
          addressLine1: order.address.addressLine1,
          city: order.address.city,
          postalCode: order.address.postalCode,
        },
        subtotal: order.subtotal,
        discountAmount: order.discountAmount,
        shippingFee: order.shippingFee,
        totalAmount: order.totalAmount,
        couponCode: order.couponCode,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        items: order.items.map((i) => ({
          id: i.id,
          productId: i.productId,
          productName: i.productName,
          packType: i.packType,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        })),
        createdAt: order.createdAt.toISOString(),
      };
    } catch {
      return null;
    }
  }
}
