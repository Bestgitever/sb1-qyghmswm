import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { VisibleColumns } from '../../utils/mergeUtils/types';

interface ColumnVisibilityControlsProps {
  headers: string[];
  visibleColumns: VisibleColumns;
  onToggleColumn: (index: number) => void;
}

export function ColumnVisibilityControls({
  headers,
  visibleColumns,
  onToggleColumn
}: ColumnVisibilityControlsProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Eye className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600">Column Visibility:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {headers.map((header, index) => (
          <button
            key={index}
            onClick={() => onToggleColumn(index)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              visibleColumns[index]
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {visibleColumns[index] ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            {header}
          </button>
        ))}
      </div>
    </div>
  );
}