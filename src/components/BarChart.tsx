interface BarChartProps {
  data: { label: string; value: number; color: string }[];
  maxValue?: number;
}

export default function BarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">{item.label}</span>
            <span className="text-gray-600">{item.value.toFixed(0)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${item.color} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
