import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ColumnVisibilityProps {
  headers: string[];
  visibleColumns: Record<number, boolean>;
  onToggleColumn: (index: number) => void;
  onToggleAll: () => void;
}

export function ColumnVisibility({
  headers,
  visibleColumns,
  onToggleColumn,
  onToggleAll
}: ColumnVisibilityProps) {
  const allVisible = headers.every((_, index) => visibleColumns[index]);
  const visibleCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Column Visibility</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {visibleCount} of {headers.length} visible
          </span>
          <button
            onClick={onToggleAll}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            {allVisible ? 'Hide All' : 'Show All'}
          </button>
        </div>
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
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3" />
            )}
            {header}
          </button>
        ))}
      </div>
    </div>
  );
}