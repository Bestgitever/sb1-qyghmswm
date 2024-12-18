import React from 'react';
import { ColumnSelection } from '../types/excel';
import { CheckSquare, Square } from 'lucide-react';

interface ColumnSelectorProps {
  columns: ColumnSelection[];
  onColumnToggle: (index: number) => void;
  onToggleAll: () => void;
}

export function ColumnSelector({ 
  columns, 
  onColumnToggle, 
  onToggleAll
}: ColumnSelectorProps) {
  const allSelected = columns.every(col => col.selected);
  const selectedCount = columns.filter(c => c.selected).length;

  return (
    <div className="mb-4 border rounded-lg bg-white shadow-sm">
      <div className="p-2 border-b flex items-center justify-between">
        <button
          onClick={onToggleAll}
          className="text-xs flex items-center gap-1 text-gray-600 hover:text-blue-600"
          type="button"
        >
          {allSelected ? (
            <Square className="w-3 h-3" />
          ) : (
            <CheckSquare className="w-3 h-3" />
          )}
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
        <span className="text-xs text-gray-500">
          {selectedCount} selected
        </span>
      </div>

      <div className="max-h-[200px] overflow-y-auto p-1">
        <div className="grid grid-cols-2 gap-1">
          {columns.map((col) => (
            <button
              key={col.index}
              onClick={() => onColumnToggle(col.index)}
              className={`flex items-center justify-between px-2 py-1 rounded text-xs transition-colors ${
                col.selected
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              type="button"
            >
              <span className="truncate mr-1">{col.label}</span>
              {col.selected ? (
                <CheckSquare className="w-3 h-3 flex-shrink-0" />
              ) : (
                <Square className="w-3 h-3 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}