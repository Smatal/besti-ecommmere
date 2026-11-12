import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Clinical Product",
  type: "document",
  groups: [
    { name: "general", title: "General Info" },
    { name: "pricing", title: "Pricing & Packs" },
    { name: "clinical", title: "Actives & Formulation" },
    { name: "howTo", title: "How To Use" },
    { name: "comparison", title: "Clinical Specs & Comparison" },
    { name: "faqs", title: "FAQs" },
  ],
  fields: [
    // --- GENERAL ---
    defineField({
      name: "id",
      title: "Canonical Product ID",
      type: "string",
      group: "general",
      description: "Must match ID-only checkout contract (e.g. 'sunscreen', 'vitaminc', 'facewash', 'kojic', 'collagen', 'undereye')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Product Title",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "general",
    }),
    defineField({
      name: "categoryName",
      title: "Category Display Name",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "concern",
      title: "Primary Skin Concern",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "Sun Protection (UV)", value: "sun" },
          { title: "Pigmentation & Dark Spots", value: "pigmentation" },
          { title: "Dullness & Glow", value: "dullness" },
          { title: "Aging & Fine Lines", value: "aging" },
          { title: "Acne & Texture", value: "acne" },
          { title: "Hair Fall & Scalp", value: "hairfall" },
        ],
      },
    }),
    defineField({
      name: "skinType",
      title: "Target Skin Type",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "All Skin Types", value: "all" },
          { title: "Oily & Acne Prone", value: "oily" },
          { title: "Dry & Dehydrated", value: "dry" },
          { title: "Sensitive", value: "sensitive" },
        ],
      },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "image",
      title: "Product Image URL or Upload",
      type: "image",
      group: "general",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageUrl",
      title: "Fallback Local Asset Path",
      type: "string",
      group: "general",
      description: "e.g. /client_assets/sunscreen.jpg",
    }),
    defineField({
      name: "volume",
      title: "Net Volume / Weight",
      type: "string",
      group: "general",
      description: "e.g. '100 ml e 3.38 fl. oz'",
    }),
    defineField({
      name: "rating",
      title: "Customer Rating",
      type: "number",
      group: "general",
      initialValue: 4.9,
    }),
    defineField({
      name: "reviewsCount",
      title: "Total Reviews Count",
      type: "number",
      group: "general",
      initialValue: 1200,
    }),
    defineField({
      name: "badge",
      title: "Marketing Badge",
      type: "string",
      group: "general",
      description: "e.g. 'HERO BESTSELLER', 'CLINICAL GRADE'",
    }),
    defineField({
      name: "badgeType",
      title: "Badge Style Class",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "Gold Badge", value: "badge-gold" },
          { title: "Teal Badge", value: "badge-teal" },
          { title: "Rose Badge", value: "badge-rose" },
        ],
      },
    }),
    defineField({
      name: "themeColor",
      title: "Theme Accent Color",
      type: "string",
      group: "general",
      description: "Hex code e.g. '#0d7377'",
    }),

    // --- PRICING ---
    defineField({
      name: "singlePrice",
      title: "Single Pack Selling Price (₹)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "singleMrp",
      title: "Single Pack MRP (₹)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "duoPrice",
      title: "Duo Pack Selling Price (₹)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "duoMrp",
      title: "Duo Pack MRP (₹)",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),

    // --- CLINICAL ACTIVES & FORMULATION ---
    defineField({
      name: "highlights",
      title: "Key Benefit Highlights",
      type: "array",
      of: [{ type: "string" }],
      group: "clinical",
    }),
    defineField({
      name: "actives",
      title: "Clinical Actives Summary",
      type: "string",
      group: "clinical",
    }),
    defineField({
      name: "description",
      title: "Detailed Description",
      type: "text",
      group: "clinical",
    }),
    defineField({
      name: "inci",
      title: "Full INCI Ingredient List",
      type: "text",
      group: "clinical",
    }),

    // --- HOW TO USE ---
    defineField({
      name: "howToUse",
      title: "Application Protocol Steps",
      type: "array",
      of: [{ type: "string" }],
      group: "howTo",
    }),

    // --- SPECS & COMPARISON ---
    defineField({
      name: "specs",
      title: "Formulation Specifications",
      type: "array",
      group: "comparison",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Specification Key", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "comparison",
      title: "Market Comparison Matrix",
      type: "array",
      group: "comparison",
      of: [
        {
          type: "object",
          fields: [
            { name: "feature", title: "Feature", type: "string" },
            { name: "bestie", title: "Bestie Cares", type: "string" },
            { name: "market", title: "Standard Market Formulations", type: "string" },
          ],
        },
      ],
    }),

    // --- FAQS ---
    defineField({
      name: "faqs",
      title: "Clinical FAQs",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text" },
          ],
        },
      ],
    }),
  ],
});
