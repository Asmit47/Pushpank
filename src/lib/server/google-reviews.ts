import "server-only";
import type { GoogleReviewPayload } from "@/lib/google-reviews-types";

export type { GoogleReview, GoogleReviewPayload } from "@/lib/google-reviews-types";

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
};

/**
 * Places API (New) returns at most five reviews, chosen by Google.
 * Cached for 12 hours. Returns null when the key is missing or the call fails.
 */
export async function getGoogleReviews(): Promise<GoogleReviewPayload | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;
  if (!key || !id) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: PlacesReview[];
    };
    const reviews = (data.reviews ?? [])
      .filter((r) => r.text?.text && r.authorAttribution?.displayName)
      .map((r) => ({
        author: r.authorAttribution!.displayName!,
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: r.text!.text!,
        relativeTime: r.relativePublishTimeDescription ?? "",
        authorUrl: r.authorAttribution?.uri,
      }));
    if (reviews.length === 0) return null;
    return {
      rating: data.rating,
      count: data.userRatingCount,
      mapsUrl: data.googleMapsUri,
      reviews,
    };
  } catch {
    return null;
  }
}
