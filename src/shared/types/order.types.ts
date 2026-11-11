export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'UPI' | 'CARD' | 'COD';

export interface CheckoutItemPayload {
  productId: string;
  packType: 'single' | 'duo';
  quantity: number;
}

export interface ShippingAddressPayload {
  name: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
}

export interface CheckoutRequestPayload {
  items: CheckoutItemPayload[];
  bundleId?: string;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddressPayload;
}

export interface OrderItemDetail {
  id: string;
  productId: string;
  productName: string;
  packType: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderDetail {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    addressLine1: string;
    city: string;
    postalCode: string;
  };
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: OrderItemDetail[];
  createdAt: string;
}

