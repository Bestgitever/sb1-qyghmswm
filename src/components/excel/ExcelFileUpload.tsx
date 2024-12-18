import React from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface ExcelFileUploadProps {
  title: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  description?: string;
}

export function ExcelFileUpload({
  title,
  onUpload,
  error,
  description
}: ExcelFileUploadProps) {
  return (
    <div className="mb-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">{title}</span>
        {description && (
          <span className="text-xs text-gray-500">{description}</span>
        )}
        <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
          <Upload className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">Click to upload Excel file</span>
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={onUpload}
          />
        </div>
      </label>
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}