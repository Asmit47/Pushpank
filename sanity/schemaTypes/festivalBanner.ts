import { defineField, defineType } from "sanity";

export const festivalBanner = defineType({
  name: "festivalBanner",
  title: "Festival banner",
  type: "document",
  fields: [
    defineField({
      name: "message",
      type: "string",
      description: "Shown in the slim strip at the top of the site.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "href", title: "Link", type: "string", description: "Optional. A site path such as /collections/festival-collections." }),
    defineField({ name: "startsAt", title: "Starts", type: "datetime" }),
    defineField({ name: "endsAt", title: "Ends", type: "datetime" }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "message", subtitle: "active" } },
});
