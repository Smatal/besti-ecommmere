import { defineType, defineField } from "sanity";

export const bundleKit = defineType({
  name: "bundleKit",
  title: "Bundle Kit",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Bundle Kit ID",
      type: "string",
      description: "e.g. 'bundle-glow', 'bundle-pigmentation', 'bundle-youth'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Bundle Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Routine Purpose",
      type: "string",
    }),
    defineField({
      name: "itemIds",
      title: "Included Product IDs",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. ['facewash', 'vitaminc', 'sunscreen']",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "itemNames",
      title: "Item Names Summary Text",
      type: "string",
      description: "e.g. 'Glutathione Face Wash + Vitamin C 20% Serum + Aqua Gel Sunscreen SPF 50+'",
    }),
    defineField({
      name: "price",
      title: "Bundle Selling Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "mrp",
      title: "Bundle MRP (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "savings",
      title: "Savings Badge Text",
      type: "string",
      description: "e.g. '32% OFF'",
    }),
    defineField({
      name: "freebie",
      title: "Free Gift Description",
      type: "string",
      description: "e.g. 'FREE Velvet Cosmetic Pouch + 2 Deluxe Minis'",
    }),
    defineField({
      name: "badge",
      title: "Highlight Badge",
      type: "string",
      description: "e.g. 'MOST POPULAR ROUTINE'",
    }),
  ],
});
