import { TrendingUp, AlertCircle, Award, Target } from 'lucide-react';
import { AnalyticsData } from '../types/listing';
import { formatCurrency } from '../utils/analytics';

interface InsightsPanelProps {
  analytics: AnalyticsData;
}

export default function InsightsPanel({ analytics }: InsightsPanelProps) {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Market Leader',
      description: `${analytics.boroughDistribution[0]?.borough} dominates with ${analytics.boroughDistribution[0]?.percentage.toFixed(1)}% of listings`,
      color: 'bg-blue-500'
    },
    {
      icon: Award,
      title: 'Most Popular Type',
      description: `${analytics.roomTypeDistribution[0]?.type} accounts for ${analytics.roomTypeDistribution[0]?.percentage.toFixed(1)}% of properties`,
      color: 'bg-green-500'
    },
    {
      icon: Target,
      title: 'Average Pricing',
      description: `Market average is ${formatCurrency(analytics.averagePrice)} per night`,
      color: 'bg-orange-500'
    },
    {
      icon: AlertCircle,
      title: 'Top Neighborhood',
      description: `${analytics.topNeighbourhoods[0]?.neighbourhood} leads with ${analytics.topNeighbourhoods[0]?.count} listings`,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className={`${insight.color} p-2 rounded-lg flex-shrink-0`}>
              <insight.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                {insight.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
