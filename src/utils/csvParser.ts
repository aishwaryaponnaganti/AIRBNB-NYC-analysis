import { Listing } from '../types/listing';

export const parseCSV = (csvText: string): Listing[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const listings: Listing[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length !== headers.length) continue;

    try {
      const listing: Listing = {
        id: parseInt(values[0]),
        name: values[1].replace(/^["']|["']$/g, ''),
        host_id: parseInt(values[2]),
        host_name: values[3].replace(/^["']|["']$/g, ''),
        neighbourhood_group: values[4].replace(/^["']|["']$/g, ''),
        neighbourhood: values[5].replace(/^["']|["']$/g, ''),
        latitude: parseFloat(values[6]),
        longitude: parseFloat(values[7]),
        room_type: values[8].replace(/^["']|["']$/g, ''),
        price: parseFloat(values[9]),
        minimum_nights: parseInt(values[10]),
        number_of_reviews: parseInt(values[11]),
        last_review: values[12] || null,
        reviews_per_month: values[13] ? parseFloat(values[13]) : null,
        calculated_host_listings_count: parseInt(values[14]),
        availability_365: parseInt(values[15])
      };

      if (!isNaN(listing.id) && listing.name) {
        listings.push(listing);
      }
    } catch (error) {
      console.error(`Error parsing line ${i}:`, error);
    }
  }

  return listings;
};

export const generateSampleCSV = (): string => {
  const headers = [
    'id', 'name', 'host_id', 'host_name', 'neighbourhood_group', 'neighbourhood',
    'latitude', 'longitude', 'room_type', 'price', 'minimum_nights',
    'number_of_reviews', 'last_review', 'reviews_per_month',
    'calculated_host_listings_count', 'availability_365'
  ];

  const sampleRow = [
    '2539',
    'Clean & quiet apt home by the park',
    '2787',
    'John',
    'Brooklyn',
    'Kensington',
    '40.64749',
    '-73.97237',
    'Private room',
    '149',
    '1',
    '9',
    '2018-10-19',
    '0.21',
    '6',
    '365'
  ];

  return [headers.join(','), sampleRow.join(',')].join('\n');
};
