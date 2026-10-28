import { defineField, defineType } from "sanity";

/** An uploaded Sanity image, or a path / URL that already lives on the site. */
export const media = defineType({
  name: "media",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Upload",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "src",
      title: "Or image path / URL",
      type: "string",
      description: "Use a site path such as /images/... when the file is already on the website.",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
