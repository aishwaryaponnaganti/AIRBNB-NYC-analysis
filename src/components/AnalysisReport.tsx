import { FileText, TrendingUp, MapPin, Users, DollarSign } from 'lucide-react';
import { AnalyticsData } from '../types/listing';
import { formatCurrency, formatNumber } from '../utils/analytics';

interface AnalysisReportProps {
  analytics: AnalyticsData;
}

export default function AnalysisReport({ analytics }: AnalysisReportProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
        <div className="bg-blue-500 p-3 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Statistical Analysis Report</h3>
          <p className="text-sm text-gray-600">Comprehensive market insights and trends</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">Market Overview</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The New York City Airbnb market comprises <strong>{formatNumber(analytics.totalListings)}</strong> active listings
              with an average nightly rate of <strong>{formatCurrency(analytics.averagePrice)}</strong>. The market demonstrates
              robust engagement with an average of <strong>{formatNumber(analytics.averageReviews)}</strong> reviews per listing,
              indicating strong customer interaction and satisfaction tracking.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Properties show an average availability of <strong>{formatNumber(analytics.averageAvailability)} days</strong> per year,
              suggesting moderate to high occupancy rates across the market. This metric is crucial for understanding supply
              dynamics and host commitment levels.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-900">Geographic Distribution</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              <strong>{analytics.boroughDistribution[0]?.borough}</strong> dominates the market with{' '}
              <strong>{analytics.boroughDistribution[0]?.percentage.toFixed(1)}%</strong> of all listings, positioning itself
              as the primary hub for short-term rentals. This concentration reflects the borough's appeal to tourists and
              business travelers alike.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {analytics.boroughDistribution.map((borough, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{borough.percentage.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">{borough.borough}</div>
                  <div className="text-xs text-gray-500 mt-1">{borough.count} listings</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-orange-600" />
            <h4 className="text-lg font-semibold text-gray-900">Accommodation Types</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The market is predominantly composed of <strong>{analytics.roomTypeDistribution[0]?.type}</strong> listings,
              accounting for <strong>{analytics.roomTypeDistribution[0]?.percentage.toFixed(1)}%</strong> of the total inventory.
              This distribution pattern reveals guest preferences and host investment strategies within the NYC market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {analytics.roomTypeDistribution.map((type, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{type.count}</div>
                  <div className="text-sm text-gray-600">{type.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{type.percentage.toFixed(1)}% of total</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-red-600" />
            <h4 className="text-lg font-semibold text-gray-900">Price Analysis</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Price distribution reveals diverse market segments catering to various budget ranges. The majority of listings
              fall within the mid-tier pricing categories, balancing affordability with quality accommodations. Premium
              listings command higher rates, particularly in desirable neighborhoods.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              {analytics.priceRanges.map((range, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <div className="text-xl font-bold text-gray-900">{range.count}</div>
                  <div className="text-xs text-gray-600 mt-1">{range.range}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900">Top Performing Neighborhoods</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Analysis of neighborhood-level data identifies key clusters of listing activity. <strong>{analytics.topNeighbourhoods[0]?.neighbourhood}</strong> leads
              with <strong>{analytics.topNeighbourhoods[0]?.count} listings</strong> and an average price of{' '}
              <strong>{formatCurrency(analytics.topNeighbourhoods[0]?.avgPrice)}</strong>, indicating strong market demand
              and host confidence in the area.
            </p>
            <div className="space-y-2">
              {analytics.topNeighbourhoods.slice(0, 5).map((hood, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-700 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{hood.neighbourhood}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(hood.avgPrice)}</div>
                    <div className="text-xs text-gray-500">{hood.count} listings</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Findings & Recommendations</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Geographic concentration in {analytics.boroughDistribution[0]?.borough} presents opportunities for market expansion in underserved areas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Strong review engagement indicates robust market health and customer satisfaction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Price diversity across neighborhoods enables market access for various traveler segments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>High availability rates suggest competitive supply dynamics requiring strategic pricing</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>This analysis provides insights for stakeholders navigating the evolving landscape of short-term accommodation in NYC</p>
      </div>
    </div>
  );
}
