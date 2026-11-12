import { writeClient } from "./lib/client";
import { PRODUCTS, BUNDLE_KITS } from "@/shared/data/products";
import { isConfigured } from "./env";

export async function seedSanity() {
  if (!isConfigured) {
    console.error("Sanity is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
    return;
  }

  console.log("🚀 Starting Sanity seed for Bestie Cares...");

  // 1. Seed Categories
  const categories = [
    { id: "sunscreen", name: "Sun Protection", description: "Broad-spectrum UV & PA++++ protection" },
    { id: "serums", name: "Antioxidants & Glow", description: "Potent clinical serums for dark spots, glow, and youth" },
    { id: "cleansers", name: "Gentle Cleansers", description: "Barrier-protecting daily cleansers" },
    { id: "haircare", name: "Clinical Haircare", description: "Scalp vitality and hair density treatments" },
  ];

  const categoryDocMap = new Map<string, string>();

  for (const cat of categories) {
    const doc = await writeClient.createOrReplace({
      _id: `category-${cat.id}`,
      _type: "category",
      id: cat.id,
      name: cat.name,
      slug: { _type: "slug", current: cat.id },
      description: cat.description,
    });
    categoryDocMap.set(cat.id, doc._id);
    console.log(`✅ Category seeded: ${cat.name}`);
  }

  // 2. Seed Products
  for (const p of PRODUCTS) {
    const categoryDocId = categoryDocMap.get(p.category);
    await writeClient.createOrReplace({
      _id: `product-${p.id}`,
      _type: "product",
      id: p.id,
      name: p.name,
      slug: { _type: "slug", current: p.id },
      category: categoryDocId ? { _type: "reference", _ref: categoryDocId } : undefined,
      categoryName: p.categoryName,
      concern: p.concern,
      skinType: p.skinType,
      subtitle: p.subtitle,
      imageUrl: p.image,
      singlePrice: p.singlePrice,
      singleMrp: p.singleMrp,
      duoPrice: p.duoPrice,
      duoMrp: p.duoMrp,
      volume: p.volume,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      badge: p.badge,
      badgeType: p.badgeType,
      themeColor: p.themeColor,
      highlights: p.highlights,
      actives: p.actives,
      description: p.description,
      howToUse: p.howToUse,
      inci: p.inci,
      specs: p.specs
        ? Object.entries(p.specs).map(([key, value]) => ({ _key: key, key, value }))
        : [],
      comparison: p.comparison
        ? p.comparison.map((c, i) => ({ _key: `comp-${i}`, ...c }))
        : [],
      faqs: p.faqs
        ? p.faqs.map((f, i) => ({ _key: `faq-${i}`, ...f }))
        : [],
    });
    console.log(`✅ Product seeded: ${p.name}`);
  }

  // 3. Seed Bundles
  for (const b of BUNDLE_KITS) {
    await writeClient.createOrReplace({
      _id: `bundle-${b.id}`,
      _type: "bundleKit",
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      itemIds: b.items,
      itemNames: b.itemNames,
      price: b.price,
      mrp: b.mrp,
      savings: b.savings,
      freebie: b.freebie,
      badge: b.badge,
    });
    console.log(`✅ Bundle seeded: ${b.title}`);
  }

  console.log("🎉 Sanity catalog seeding completed successfully!");
}

if (process.argv[1]?.includes("seed")) {
  seedSanity().catch(console.error);
}
