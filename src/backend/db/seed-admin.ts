import { prisma } from "./client";

async function seedAdminData() {
  console.log("Seeding Admin & Store Data into Neon DB...");

  // 1. Seed Default Admin User
  await prisma.adminUser.upsert({
    where: { email: "admin@besticares.com" },
    update: {},
    create: {
      email: "admin@besticares.com",
      name: "Dr. Admin (Bestie Cares)",
      password: "admin_secure_hash_placeholder",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log("✅ Admin user seeded: admin@besticares.com");

  // 2. Seed Default Store Settings
  const settings = [
    { key: "store_name", value: "Bestie Cares", label: "Store Name", group: "general", description: "Public brand name" },
    { key: "store_tagline", value: "Dermatologically Formulated Skincare", label: "Store Tagline", group: "general", description: "Header tagline" },
    { key: "support_email", value: "care@besticares.com", label: "Support Email", group: "general", description: "Customer care email" },
    { key: "support_phone", value: "+91 98765 43210", label: "Support WhatsApp / Phone", group: "general", description: "Official support helpline" },
    { key: "free_shipping_threshold", value: "499", label: "Free Delivery Threshold (₹)", group: "shipping", description: "Orders at or above this amount receive free shipping" },
    { key: "standard_shipping_fee", value: "50", label: "Standard Delivery Fee (₹)", group: "shipping", description: "Fee charged when order is below threshold" },
    { key: "cod_enabled", value: "true", label: "Cash on Delivery (COD) Enabled", group: "payments", description: "Allow customers to choose COD" },
    { key: "razorpay_enabled", value: "true", label: "Razorpay Gateway Enabled", group: "payments", description: "Allow UPI and Card payments" },
    { key: "enable_order_emails", value: "true", label: "Send Order Confirmation Emails", group: "email", description: "Automated receipt via Resend" },
  ];

  for (const s of settings) {
    await prisma.storeSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log("✅ Store settings seeded");

  // 3. Seed Default Inventory for 9 Clinical Products
  const products = [
    { productId: "sunscreen", availableStock: 120, lowStockThreshold: 20 },
    { productId: "vitaminc", availableStock: 85, lowStockThreshold: 15 },
    { productId: "collagen", availableStock: 45, lowStockThreshold: 10 },
    { productId: "facewash", availableStock: 150, lowStockThreshold: 25 },
    { productId: "kojic", availableStock: 60, lowStockThreshold: 15 },
    { productId: "undereye", availableStock: 90, lowStockThreshold: 15 },
    { productId: "lotion", availableStock: 75, lowStockThreshold: 15 },
    { productId: "shampoo", availableStock: 40, lowStockThreshold: 10 },
    { productId: "conditioner", availableStock: 55, lowStockThreshold: 10 },
  ];

  for (const inv of products) {
    await prisma.inventory.upsert({
      where: { productId: inv.productId },
      update: {},
      create: inv,
    });
  }
  console.log("✅ Product inventory seeded for 9 products");

  // 4. Seed Initial Audit Log
  await prisma.auditLog.create({
    data: {
      action: "SYSTEM_INITIALIZED",
      summary: "Bestie Cares Admin Portal database schemas and initial configuration initialized.",
      entityType: "System",
    },
  });
  console.log("✅ Audit log initialized");
}

seedAdminData()
  .catch(console.error)
  .finally(() => process.exit(0));

