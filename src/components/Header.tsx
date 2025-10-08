import { Home, BarChart3, TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Airbnb NYC Analytics</h1>
              <p className="text-xs text-gray-600">Market Intelligence Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Real-time Insights</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Market Trends</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
