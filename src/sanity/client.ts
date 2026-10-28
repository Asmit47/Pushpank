import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

export { sanityConfigured };

export const client: SanityClient | null = sanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: !process.env.SANITY_API_READ_TOKEN,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "published",
    })
  : null;
