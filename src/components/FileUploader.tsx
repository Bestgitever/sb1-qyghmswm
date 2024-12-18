import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function FileUploader({ onFileUpload, label }: FileUploaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 p-2 border border-gray-300 rounded hover:border-blue-500 transition-colors">
        <Upload className="h-4 w-4 text-gray-400" />
        <label className="flex-1 cursor-pointer">
          <span className="text-xs text-gray-600">{label}</span>
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={onFileUpload}
          />
        </label>
      </div>
    </div>
  );
}