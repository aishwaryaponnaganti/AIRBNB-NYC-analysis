import { useState, useMemo } from 'react';
import { DollarSign, Home, Star, Calendar, BarChart as BarChartIcon, FileText } from 'lucide-react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import ChartCard from './components/ChartCard';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import FilterBar from './components/FilterBar';
import ListingTable from './components/ListingTable';
import InsightsPanel from './components/InsightsPanel';
import DataUpload from './components/DataUpload';
import AnalysisReport from './components/AnalysisReport';
import { sampleListings } from './data/sampleData';
import { calculateAnalytics, formatCurrency, formatNumber } from './utils/analytics';
import { parseCSV } from './utils/csvParser';
import { Listing } from './types/listing';

function App() {
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [selectedRoomType, setSelectedRoomType] = useState('All');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'report'>('dashboard');
  const [listings, setListings] = useState<Listing[]>(sampleListings);

  const handleDataUpload = (csvText: string) => {
    const parsedListings = parseCSV(csvText);
    if (parsedListings.length > 0) {
      setListings(parsedListings);
    }
  };

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const boroughMatch = selectedBorough === 'All' || listing.neighbourhood_group === selectedBorough;
      const roomTypeMatch = selectedRoomType === 'All' || listing.room_type === selectedRoomType;
      return boroughMatch && roomTypeMatch;
    });
  }, [listings, selectedBorough, selectedRoomType]);

  const analytics = useMemo(() => calculateAnalytics(filteredListings), [filteredListings]);

  const boroughs = Array.from(new Set(listings.map(l => l.neighbourhood_group)));
  const roomTypes = Array.from(new Set(listings.map(l => l.room_type)));

  const boroughColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-purple-500'];
  const roomTypeColors = ['bg-cyan-500', 'bg-teal-500', 'bg-lime-500'];
  const priceRangeColors = ['bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            New York City Market Analysis
          </h2>
          <p className="text-gray-600">
            Comprehensive insights into Airbnb listings across NYC's five boroughs
          </p>
        </div>

        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChartIcon className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'report'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5" />
            Analysis Report
          </button>
        </div>

        {activeTab === 'dashboard' ? (
        <div className="space-y-6">
          <DataUpload onDataUploaded={handleDataUpload} />
          <FilterBar
            selectedBorough={selectedBorough}
            selectedRoomType={selectedRoomType}
            onBoroughChange={setSelectedBorough}
            onRoomTypeChange={setSelectedRoomType}
            boroughs={boroughs}
            roomTypes={roomTypes}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Home}
              label="Total Listings"
              value={formatNumber(analytics.totalListings)}
              trend="Active properties"
              iconColor="bg-blue-500"
            />
            <StatCard
              icon={DollarSign}
              label="Average Price"
              value={formatCurrency(analytics.averagePrice)}
              trend="Per night"
              iconColor="bg-green-500"
            />
            <StatCard
              icon={Star}
              label="Average Reviews"
              value={formatNumber(analytics.averageReviews)}
              trend="Per listing"
              iconColor="bg-orange-500"
            />
            <StatCard
              icon={Calendar}
              label="Avg Availability"
              value={`${formatNumber(analytics.averageAvailability)} days`}
              trend="Per year"
              iconColor="bg-red-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ChartCard
                title="Borough Distribution"
                description="Listings spread across New York City boroughs"
              >
                <BarChart
                  data={analytics.boroughDistribution.map((item, index) => ({
                    label: item.borough,
                    value: item.count,
                    color: boroughColors[index % boroughColors.length]
                  }))}
                />
              </ChartCard>

              <ChartCard
                title="Price Distribution"
                description="Number of listings by price range"
              >
                <BarChart
                  data={analytics.priceRanges.map((item, index) => ({
                    label: item.range,
                    value: item.count,
                    color: priceRangeColors[index % priceRangeColors.length]
                  }))}
                />
              </ChartCard>

              <ChartCard
                title="Top 10 Neighborhoods"
                description="Most popular neighborhoods by listing count"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                          Neighborhood
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                          Listings
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                          Avg Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analytics.topNeighbourhoods.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {item.neighbourhood}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">
                            {item.count}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">
                            {formatCurrency(item.avgPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ChartCard>
            </div>

            <div className="space-y-6">
              <ChartCard
                title="Room Type Distribution"
                description="Breakdown by accommodation type"
              >
                <PieChart
                  data={analytics.roomTypeDistribution.map((item, index) => ({
                    label: item.type,
                    value: item.count,
                    color: ['#3b82f6', '#10b981', '#f59e0b'][index % 3]
                  }))}
                />
              </ChartCard>

              <InsightsPanel analytics={analytics} />
            </div>
          </div>

          <ListingTable listings={filteredListings} />
        </div>
        ) : (
          <AnalysisReport analytics={analytics} />
        )}

        <footer className="mt-16 pb-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            Airbnb NYC Market Research Analysis Dashboard
          </p>
          <p className="text-xs text-gray-500">
            Data insights for stakeholders and enthusiasts navigating the short-term accommodation landscape
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
