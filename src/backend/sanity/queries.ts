import { groq } from "next-sanity";

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    id,
    name,
    "slug": slug.current,
    description
  }
`;

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    id,
    name,
    "slug": slug.current,
    "category": coalesce(category->id, categoryName, "serums"),
    "categoryName": coalesce(category->name, categoryName, "Skincare"),
    concern,
    skinType,
    subtitle,
    "image": coalesce(image.asset->url, imageUrl, "/client_assets/sunscreen.jpg"),
    singlePrice,
    singleMrp,
    duoPrice,
    duoMrp,
    volume,
    rating,
    reviewsCount,
    badge,
    badgeType,
    themeColor,
    highlights,
    actives,
    description,
    howToUse,
    inci,
    specs,
    comparison,
    faqs
  }
`;

export const PRODUCT_BY_ID_QUERY = groq`
  *[_type == "product" && (id == $id || slug.current == $id)][0] {
    _id,
    id,
    name,
    "slug": slug.current,
    "category": coalesce(category->id, categoryName, "serums"),
    "categoryName": coalesce(category->name, categoryName, "Skincare"),
    concern,
    skinType,
    subtitle,
    "image": coalesce(image.asset->url, imageUrl, "/client_assets/sunscreen.jpg"),
    singlePrice,
    singleMrp,
    duoPrice,
    duoMrp,
    volume,
    rating,
    reviewsCount,
    badge,
    badgeType,
    themeColor,
    highlights,
    actives,
    description,
    howToUse,
    inci,
    specs,
    comparison,
    faqs
  }
`;

export const ALL_BUNDLES_QUERY = groq`
  *[_type == "bundleKit"] | order(_createdAt asc) {
    _id,
    id,
    title,
    subtitle,
    "items": itemIds,
    itemNames,
    price,
    mrp,
    savings,
    freebie,
    badge
  }
`;
