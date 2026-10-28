import { defineArrayMember, defineField, defineType } from "sanity";

const badges = [
  { title: "Bestseller", value: "Bestseller" },
  { title: "New", value: "New" },
  { title: "Same-day", value: "Same-day" },
  { title: "Festive", value: "Festive" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2, validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({
      name: "collections",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "media" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "secondaryImage", title: "Second image", type: "media" }),
    defineField({
      name: "variants",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "variantId",
              title: "Variant id",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "sku", title: "SKU", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "price", type: "number", validation: (rule) => rule.required().min(0) }),
            defineField({ name: "salePrice", title: "Sale price", type: "number", validation: (rule) => rule.min(0) }),
            defineField({ name: "inStock", title: "In stock", type: "boolean", initialValue: true }),
          ],
          preview: {
            select: { title: "label", subtitle: "sku" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "inclusions", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "details",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "storage", type: "text", rows: 2 }),
    defineField({ name: "perishable", type: "boolean", initialValue: false }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "createdAt", title: "Added on", type: "date" }),
    defineField({
      name: "occasions",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "badge", type: "string", options: { list: badges } }),
    defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
  preview: {
    select: { title: "name", subtitle: "shortDescription", media: "images.0.image" },
  },
});
