import { defineField, defineType } from "sanity";

export const homepageCampaign = defineType({
  name: "homepageCampaign",
  title: "Homepage campaign",
  type: "document",
  fields: [
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "collectionSlug",
      title: "Collection link",
      type: "string",
      description: "Category slug, for example festival-collections.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "endsOn", title: "Available until", type: "date" }),
    defineField({ name: "terms", type: "string" }),
    defineField({ name: "image", type: "media", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "endsOn", media: "image.image" } },
});
