export interface Listing {
  id: number;
  name: string;
  host_id: number;
  host_name: string;
  neighbourhood_group: string;
  neighbourhood: string;
  latitude: number;
  longitude: number;
  room_type: string;
  price: number;
  minimum_nights: number;
  number_of_reviews: number;
  last_review: string | null;
  reviews_per_month: number | null;
  calculated_host_listings_count: number;
  availability_365: number;
}

export interface AnalyticsData {
  totalListings: number;
  averagePrice: number;
  averageReviews: number;
  averageAvailability: number;
  boroughDistribution: { borough: string; count: number; percentage: number }[];
  roomTypeDistribution: { type: string; count: number; percentage: number }[];
  priceRanges: { range: string; count: number }[];
  topNeighbourhoods: { neighbourhood: string; count: number; avgPrice: number }[];
}
