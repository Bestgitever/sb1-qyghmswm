import React from 'react';
import { ArrowUpDown, Lock, Unlock, LayoutGrid, Calculator } from 'lucide-react';
import { ColumnSelection, AggregationType } from '../types/excel';

interface ColumnOptionsProps {
  column: ColumnSelection;
  onUpdate: (updatedColumn: ColumnSelection) => void;
}

export function ColumnOptions({ column, onUpdate }: ColumnOptionsProps) {
  const handleSortChange = () => {
    const directions: Record<string, 'asc' | 'desc' | null> = {
      'asc': 'desc',
      'desc': null,
      'null': 'asc'
    };
    onUpdate({
      ...column,
      sortDirection: directions[String(column.sortDirection)]
    });
  };

  const handleGroupByToggle = () => {
    onUpdate({
      ...column,
      groupBy: !column.groupBy
    });
  };

  const handleAggregationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({
      ...column,
      aggregation: e.target.value as AggregationType
    });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...column,
      width: Number(e.target.value)
    });
  };

  const handleFreezeToggle = () => {
    onUpdate({
      ...column,
      frozen: !column.frozen
    });
  };

  return (
    <div className="absolute z-20 mt-1 w-48 bg-white rounded-md shadow-lg p-2 border border-gray-200">
      <div className="space-y-2">
        <button
          onClick={handleSortChange}
          className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort: {column.sortDirection || 'None'}
        </button>

        <button
          onClick={handleGroupByToggle}
          className={`flex items-center gap-2 w-full px-2 py-1 text-sm rounded ${
            column.groupBy ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Group by this column
        </button>

        <div className="flex items-center gap-2 px-2 py-1">
          <Calculator className="w-4 h-4 text-gray-500" />
          <select
            value={column.aggregation || ''}
            onChange={handleAggregationChange}
            className="flex-1 text-sm border rounded px-1 py-0.5"
          >
            <option value="">No aggregation</option>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="count">Count</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-2 py-1">
          <input
            type="number"
            min="50"
            max="500"
            value={column.width}
            onChange={handleWidthChange}
            className="w-20 text-sm border rounded px-1 py-0.5"
          />
          <span className="text-sm text-gray-500">px width</span>
        </div>

        <button
          onClick={handleFreezeToggle}
          className={`flex items-center gap-2 w-full px-2 py-1 text-sm rounded ${
            column.frozen ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {column.frozen ? (
            <Lock className="w-4 h-4" />
          ) : (
            <Unlock className="w-4 h-4" />
          )}
          {column.frozen ? 'Unfreeze column' : 'Freeze column'}
        </button>
      </div>
    </div>
  );
}