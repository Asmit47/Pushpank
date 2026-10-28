import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage campaign")
        .id("homepageCampaign")
        .child(S.document().schemaType("homepageCampaign").documentId("homepageCampaign")),
      S.documentTypeListItem("festivalBanner").title("Festival banners"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
