import { Listing, AnalyticsData } from '../types/listing';

export const calculateAnalytics = (listings: Listing[]): AnalyticsData => {
  const totalListings = listings.length;

  const averagePrice = listings.reduce((sum, l) => sum + l.price, 0) / totalListings;
  const averageReviews = listings.reduce((sum, l) => sum + l.number_of_reviews, 0) / totalListings;
  const averageAvailability = listings.reduce((sum, l) => sum + l.availability_365, 0) / totalListings;

  const boroughCounts = listings.reduce((acc, l) => {
    acc[l.neighbourhood_group] = (acc[l.neighbourhood_group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const boroughDistribution = Object.entries(boroughCounts).map(([borough, count]) => ({
    borough,
    count,
    percentage: (count / totalListings) * 100
  })).sort((a, b) => b.count - a.count);

  const roomTypeCounts = listings.reduce((acc, l) => {
    acc[l.room_type] = (acc[l.room_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roomTypeDistribution = Object.entries(roomTypeCounts).map(([type, count]) => ({
    type,
    count,
    percentage: (count / totalListings) * 100
  })).sort((a, b) => b.count - a.count);

  const priceRanges = [
    { range: '$0-50', count: listings.filter(l => l.price <= 50).length },
    { range: '$51-100', count: listings.filter(l => l.price > 50 && l.price <= 100).length },
    { range: '$101-150', count: listings.filter(l => l.price > 100 && l.price <= 150).length },
    { range: '$151-200', count: listings.filter(l => l.price > 150 && l.price <= 200).length },
    { range: '$201+', count: listings.filter(l => l.price > 200).length }
  ];

  const neighbourhoodData = listings.reduce((acc, l) => {
    if (!acc[l.neighbourhood]) {
      acc[l.neighbourhood] = { count: 0, totalPrice: 0 };
    }
    acc[l.neighbourhood].count++;
    acc[l.neighbourhood].totalPrice += l.price;
    return acc;
  }, {} as Record<string, { count: number; totalPrice: number }>);

  const topNeighbourhoods = Object.entries(neighbourhoodData)
    .map(([neighbourhood, data]) => ({
      neighbourhood,
      count: data.count,
      avgPrice: data.totalPrice / data.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalListings,
    averagePrice,
    averageReviews,
    averageAvailability,
    boroughDistribution,
    roomTypeDistribution,
    priceRanges,
    topNeighbourhoods
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};
