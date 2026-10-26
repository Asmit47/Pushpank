export type GoogleReview = {
  author: string;
  photo?: string;
  rating: number;
  text: string;
  relativeTime: string;
  authorUrl?: string;
};

export type GoogleReviewPayload = {
  rating?: number;
  count?: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};
