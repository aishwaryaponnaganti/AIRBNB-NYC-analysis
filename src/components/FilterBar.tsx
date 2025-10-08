import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedBorough: string;
  selectedRoomType: string;
  onBoroughChange: (borough: string) => void;
  onRoomTypeChange: (roomType: string) => void;
  boroughs: string[];
  roomTypes: string[];
}

export default function FilterBar({
  selectedBorough,
  selectedRoomType,
  onBoroughChange,
  onRoomTypeChange,
  boroughs,
  roomTypes
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="borough" className="block text-sm font-medium text-gray-700 mb-2">
            Borough
          </label>
          <select
            id="borough"
            value={selectedBorough}
            onChange={(e) => onBoroughChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="All">All Boroughs</option>
            {boroughs.map((borough) => (
              <option key={borough} value={borough}>
                {borough}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-2">
            Room Type
          </label>
          <select
            id="roomType"
            value={selectedRoomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="All">All Room Types</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
