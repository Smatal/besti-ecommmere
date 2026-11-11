import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  packType: z.enum(["single", "duo"]).default("single"),
  quantity: z.number().int().positive("Quantity must be at least 1").max(99),
});

export const shippingAddressSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+ -]+$/, "Invalid phone format"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Postal code must be a 6-digit Indian PIN code"),
});

export const checkoutRequestSchema = z.object({
  items: z.array(checkoutItemSchema).default([]),
  bundleId: z.string().optional(),
  couponCode: z.string().trim().toUpperCase().optional(),
  paymentMethod: z.enum(["UPI", "CARD", "COD"]).default("UPI"),
  shippingAddress: shippingAddressSchema,
});

export type CheckoutRequestInput = z.infer<typeof checkoutRequestSchema>;
export type CheckoutItemInput = z.infer<typeof checkoutItemSchema>;
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;

