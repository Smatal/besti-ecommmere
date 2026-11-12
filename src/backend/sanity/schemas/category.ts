import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Category ID",
      type: "string",
      description: "Identifier used in frontend filter (e.g. 'sunscreen', 'serums', 'cleansers', 'haircare')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      description: "Human-readable label (e.g. 'Sun Protection', 'Antioxidants & Glow')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});

