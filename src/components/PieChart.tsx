interface PieChartProps {
  data: { label: string; value: number; color: string }[];
}

export default function PieChart({ data }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      <div className="relative w-64 h-64">
        <svg viewBox="-1 -1 2 2" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = item.value / total;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercentage);
            cumulativePercentage += percentage;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercentage);
            const largeArcFlag = percentage > 0.5 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'L 0 0',
            ].join(' ');

            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="transition-opacity hover:opacity-80 cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
      <div className="flex-1 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm text-gray-600">
              {((item.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
