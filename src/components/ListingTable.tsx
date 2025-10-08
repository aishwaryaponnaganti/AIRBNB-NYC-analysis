import { Listing } from '../types/listing';
import { MapPin, Star, Calendar, DollarSign } from 'lucide-react';

interface ListingTableProps {
  listings: Listing[];
}

export default function ListingTable({ listings }: ListingTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Listings</h3>
        <p className="text-sm text-gray-600 mt-1">Showing {listings.length} properties</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Reviews
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listings.slice(0, 10).map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 line-clamp-1">
                      {listing.name}
                    </span>
                    <span className="text-xs text-gray-500">Host: {listing.host_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{listing.neighbourhood}</span>
                  </div>
                  <div className="text-xs text-gray-500">{listing.neighbourhood_group}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {listing.room_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    {listing.price}
                  </div>
                  <div className="text-xs text-gray-500">{listing.minimum_nights} night min</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {listing.number_of_reviews}
                  </div>
                  {listing.reviews_per_month && (
                    <div className="text-xs text-gray-500">
                      {listing.reviews_per_month.toFixed(2)}/mo
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {listing.availability_365} days
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
