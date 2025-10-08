import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

interface DataUploadProps {
  onDataUploaded: (data: string) => void;
}

export default function DataUpload({ onDataUploaded }: DataUploadProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setStatus('error');
      setMessage('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onDataUploaded(text);
      setStatus('success');
      setMessage(`Successfully loaded ${file.name}`);

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    };
    reader.onerror = () => {
      setStatus('error');
      setMessage('Error reading file');
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Data</h3>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="file-upload" className="cursor-pointer">
          <span className="text-blue-600 font-medium hover:text-blue-700">
            Choose CSV file
          </span>
          <span className="text-gray-600"> or drag and drop</span>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">
          CSV file with Airbnb listing data
        </p>
      </div>

      {status !== 'idle' && (
        <div
          className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
            status === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Expected CSV Format:</h4>
        <div className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-700 overflow-x-auto">
          <div>id,name,host_id,host_name,neighbourhood_group,neighbourhood,</div>
          <div>latitude,longitude,room_type,price,minimum_nights,</div>
          <div>number_of_reviews,last_review,reviews_per_month,</div>
          <div>calculated_host_listings_count,availability_365</div>
        </div>
      </div>
    </div>
  );
}
