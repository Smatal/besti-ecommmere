import { prisma } from "@/backend/db/client";
import { ShippingAddressInput } from "@/shared/schemas/checkout.schema";

export class CustomerRepository {
  static async findOrCreateCustomer(name: string, phone: string, email?: string) {
    const cleanPhone = phone.replace(/\s+/g, "");

    // Try finding by phone
    let customer = await prisma.customer.findUnique({
      where: { phone: cleanPhone },
    });

    if (customer) {
      if (email && !customer.email) {
        customer = await prisma.customer.update({
          where: { id: customer.id },
          data: { email },
        });
      }
      return customer;
    }

    // Create new customer
    return prisma.customer.create({
      data: {
        name,
        phone: cleanPhone,
        email: email || undefined,
        isGuest: true,
      },
    });
  }

  static async saveAddress(customerId: string, address: ShippingAddressInput) {
    return prisma.address.create({
      data: {
        customerId,
        recipientName: address.name,
        phoneNumber: address.phone.replace(/\s+/g, ""),
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
      },
    });
  }
}

